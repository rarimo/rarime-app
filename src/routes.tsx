import { lazy, Suspense, useCallback, useMemo } from 'react'
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useAuth } from '@/hooks'

import { createDeepPath } from './helpers'
import MainLayout from './layouts/MainLayout'
import PublicLayout from './layouts/PublicLayout'

export const AppRoutes = () => {
  const SignIn = lazy(() => import('@/pages/SignIn'))
  const Credentials = lazy(() => import('@/pages/Credentials'))
  const Profiles = lazy(() => import('@/pages/Profiles'))
  const UiKit = lazy(() => import('@/pages/UiKit'))
  const VerifyProofAlias = lazy(() => import('@/pages/VerifyProofAlias'))
  const AcceptInvitation = lazy(() => import('@/pages/AcceptInvitation'))

  const { isAuthorized, logout } = useAuth()

  const signInGuard = useCallback(
    ({ request }: LoaderFunctionArgs) => {
      const requestUrl = new URL(request.url)

      const from = requestUrl.searchParams.get('from')

      return isAuthorized ? redirect(from ? `${from}${requestUrl.search}` : RoutePaths.Root) : null
    },
    [isAuthorized],
  )
  const authProtectedGuard = useCallback(
    ({ request }: LoaderFunctionArgs) => {
      // If the user is not logged in and tries to access protected route, we redirect
      // them to sign in with a `from` parameter that allows login to redirect back
      // to this page upon successful authentication
      if (!isAuthorized) {
        logout()

        const requestUrl = new URL(request.url)
        requestUrl.searchParams.set('from', requestUrl.pathname)

        return redirect(`${RoutePaths.SignIn}${requestUrl.search}`)
      }

      return null
    },
    [isAuthorized, logout],
  )

  const LayoutComponent = useMemo(() => {
    return isAuthorized ? MainLayout : PublicLayout
  }, [isAuthorized])

  const router = createBrowserRouter([
    {
      path: RoutePaths.Root,
      element: (
        <LayoutComponent>
          <Suspense fallback={<></>}>
            <Outlet />
          </Suspense>
        </LayoutComponent>
      ),
      children: [
        {
          path: createDeepPath(RoutePaths.Profiles),
          loader: authProtectedGuard,
          element: <Profiles />,
        },
        {
          path: createDeepPath(RoutePaths.Orgs),
          element: <Navigate replace to={RoutePaths.Root} />,
        },
        {
          path: createDeepPath(RoutePaths.Credentials),
          loader: authProtectedGuard,
          element: <Credentials />,
        },
        {
          path: createDeepPath(RoutePaths.UiKit),
          element: <UiKit />,
        },
        {
          index: true,
          path: createDeepPath(RoutePaths.SignIn),
          loader: signInGuard,
          element: <SignIn />,
        },
        {
          path: RoutePaths.VerifyProofAlias,
          element: <VerifyProofAlias />,
        },
        {
          path: createDeepPath(RoutePaths.AcceptInvitation),
          element: <AcceptInvitation />,
          loader: authProtectedGuard,
        },
        {
          path: RoutePaths.Root,
          element: <Navigate replace to={RoutePaths.Profiles} />,
        },
        {
          path: '*',
          element: <Navigate replace to={RoutePaths.Root} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

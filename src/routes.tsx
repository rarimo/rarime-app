import { lazy, Suspense, useCallback } from 'react'
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
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

export const AppRoutes = () => {
  const SignIn = lazy(() => import('@/pages/SignIn'))
  const Orgs = lazy(() => import('@/pages/Orgs'))
  const Profiles = lazy(() => import('@/pages/Profiles'))
  const UiKit = lazy(() => import('@/pages/UiKit'))
  const VerifyProofAlias = lazy(() => import('@/pages/VerifyProofAlias'))
  const AcceptInvite = lazy(() => import('@/pages/AcceptInvite'))

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

  const router = createBrowserRouter([
    {
      path: RoutePaths.Root,
      element: (
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              path: createDeepPath(RoutePaths.Profiles),
              loader: authProtectedGuard,
              element: <Profiles />,
            },
            {
              path: createDeepPath(RoutePaths.Orgs),
              element: <Orgs />,
            },
          ],
        },
        {
          element: <AuthLayout />,
          children: [
            {
              index: true,
              path: createDeepPath(RoutePaths.SignIn),
              loader: signInGuard,
              element: <SignIn />,
            },
            {
              path: createDeepPath(RoutePaths.UiKit),
              element: <UiKit />,
            },
          ],
        },
        {
          path: RoutePaths.VerifyProofAlias,
          element: <VerifyProofAlias />,
        },
        {
          path: createDeepPath(RoutePaths.AcceptInvite),
          element: <AcceptInvite />,
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

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

  const { isAuthorized } = useAuth()

  const signInGuard = useCallback(
    () => (isAuthorized ? redirect(RoutePaths.Root) : null),
    [isAuthorized],
  )
  const authProtectedGuard = useCallback(
    ({ request }: LoaderFunctionArgs) => {
      // If the user is not logged in and tries to access protected route, we redirect
      // them to sign in with a `from` parameter that allows login to redirect back
      // to this page upon successful authentication
      if (!isAuthorized) {
        const params = new URLSearchParams()
        params.set('from', new URL(request.url).pathname)
        return redirect(`${RoutePaths.SignIn}?${params.toString()}`)
      }

      return null
    },
    [isAuthorized],
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
              loader: authProtectedGuard,
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

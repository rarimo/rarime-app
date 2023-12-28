import { lazy, Suspense, useCallback } from 'react'
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom'

import App from '@/App'
import { ToastsManager } from '@/contexts'
import { Routes } from '@/enums'
import { useAuth } from '@/hooks'
import Profiles from '@/pages/Profiles'
import UiKit from '@/pages/UiKit'

import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

export const AppRoutes = () => {
  const SignIn = lazy(() => import('@/pages/SignIn'))
  const Orgs = lazy(() => import('@/pages/Orgs'))
  const OrgNew = lazy(() => import('@/pages/OrgNew'))

  const { isAuthorized } = useAuth()

  const signInGuard = useCallback(
    () => (isAuthorized ? redirect(Routes.Root) : null),
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
        return redirect(`${Routes.SignIn}?${params.toString()}`)
      }

      return null
    },
    [isAuthorized],
  )

  const router = createBrowserRouter([
    {
      path: Routes.Root,
      element: (
        <Suspense fallback={<></>}>
          <ToastsManager>
            <App>
              <Outlet />
            </App>
          </ToastsManager>
        </Suspense>
      ),
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              index: true,
              path: Routes.Profiles,
              loader: authProtectedGuard,
              element: <Profiles />,
            },
            {
              path: Routes.Orgs,
              loader: authProtectedGuard,
              element: <Orgs />,
            },
            {
              path: Routes.OrgNew,
              loader: authProtectedGuard,
              element: <OrgNew />,
            },
          ],
        },
        {
          element: <AuthLayout />,
          children: [
            {
              index: true,
              path: Routes.SignIn,
              loader: signInGuard,
              element: <SignIn />,
            },
            {
              path: Routes.UiKit,
              element: <UiKit />,
            },
          ],
        },
        {
          path: Routes.Root,
          element: <Navigate replace to={Routes.Profiles} />,
        },
        {
          path: '*',
          element: <Navigate replace to={Routes.Root} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

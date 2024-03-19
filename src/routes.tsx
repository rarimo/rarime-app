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

import { createDeepPath, isMobile } from './helpers'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

export const AppRoutes = () => {
  const SignIn = lazy(() => import('@/pages/SignIn'))
  const Credentials = lazy(() => import('@/pages/Credentials'))
  const Dashboard = lazy(() => import('@/pages/Dashboard'))
  const UiKit = lazy(() => import('@/pages/UiKit'))
  const VerifyProofAlias = lazy(() => import('@/pages/VerifyProofAlias'))
  const AcceptInvitation = lazy(() => import('@/pages/AcceptInvitation'))
  const Rewards = lazy(() => import('@/pages/Rewards'))
  const Wallet = lazy(() => import('@/pages/Wallet'))
  const RewardsInvitationAlias = lazy(() => import('@/pages/RewardsInvitationAlias'))
  const DownloadApp = lazy(() => import('@/pages/DownloadApp'))

  const { isAuthorized, logout } = useAuth()

  const mobileGuard = useCallback(() => {
    return isMobile() ? redirect(RoutePaths.DownloadApp) : null
  }, [])

  const signInGuard = useCallback(
    ({ request }: LoaderFunctionArgs) => {
      const requestUrl = new URL(request.url)

      const from = requestUrl.searchParams.get('from')

      return isAuthorized
        ? redirect(from ? `${from}${requestUrl.search}` : RoutePaths.Root)
        : mobileGuard()
    },
    [isAuthorized, mobileGuard],
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

      return mobileGuard()
    },
    [isAuthorized, logout, mobileGuard],
  )

  const LayoutComponent = useMemo(() => {
    return isAuthorized ? MainLayout : AuthLayout
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
          path: createDeepPath(RoutePaths.Dashboard),
          loader: authProtectedGuard,
          element: <Dashboard />,
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
          path: createDeepPath(RoutePaths.Rewards),
          loader: authProtectedGuard,
          element: <Rewards />,
        },
        {
          path: createDeepPath(RoutePaths.Wallet),
          loader: authProtectedGuard,
          element: <Wallet />,
        },
        {
          path: createDeepPath(RoutePaths.UiKit),
          element: <UiKit />,
        },
        {
          path: createDeepPath(RoutePaths.SignIn),
          loader: signInGuard,
          element: <SignIn />,
        },
        {
          path: RoutePaths.VerifyProofAlias,
          element: <VerifyProofAlias />,
        },
        {
          path: RoutePaths.RewardsInvitationAlias,
          element: <RewardsInvitationAlias />,
        },
        {
          path: RoutePaths.DownloadApp,
          element: <DownloadApp />,
        },
        {
          path: createDeepPath(RoutePaths.AcceptInvitation),
          element: <AcceptInvitation />,
          loader: authProtectedGuard,
        },
        {
          path: RoutePaths.Root,
          element: <Navigate replace to={RoutePaths.Dashboard} />,
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

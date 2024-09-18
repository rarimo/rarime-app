import { lazy, Suspense, useMemo } from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useAuth } from '@/hooks'

import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

export const AppRoutes = () => {
  const RewardsInvitationAlias = lazy(() => import('@/pages/RewardsInvitationAlias'))
  const DownloadApp = lazy(() => import('@/pages/DownloadApp'))
  const ProofRequestsDemo = lazy(() => import('@/pages/ProofRequestsDemo'))

  const { isAuthorized } = useAuth()

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
          path: RoutePaths.RewardsInvitationAlias,
          element: <RewardsInvitationAlias />,
        },
        {
          path: RoutePaths.DownloadApp,
          element: <DownloadApp />,
        },
        {
          path: RoutePaths.ProofRequestsDemo,
          element: <ProofRequestsDemo />,
        },
        {
          path: RoutePaths.Root,
          element: <Navigate replace to={RoutePaths.DownloadApp} />,
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

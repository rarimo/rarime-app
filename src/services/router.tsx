import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import MainLayout from '@/components/MainLayout'

export enum RoutePaths {
  Root = '/',
  RewardsInvitationAlias = '/r/:code',
  DownloadApp = '/download-app',
  ProofRequestsDemo = '/proof-requests-demo',
}

export function AppRouter() {
  const RewardsInvitationAlias = lazy(() => import('@/pages/RewardsInvitationAlias'))
  const DownloadApp = lazy(() => import('@/pages/DownloadApp'))
  const ProofRequestsDemo = lazy(() => import('@/pages/ProofRequestsDemo'))

  const router = createBrowserRouter([
    {
      path: RoutePaths.Root,
      element: (
        <MainLayout>
          <Suspense fallback={<></>}>
            <Outlet />
          </Suspense>
        </MainLayout>
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

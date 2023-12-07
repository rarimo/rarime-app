import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import App from '@/App'
import { StatusMessage } from '@/components'
import { MetamaskZkpSnapContextProvider, Web3ProviderContextProvider } from '@/contexts'
import { Routes } from '@/enums'
import Profiles from '@/pages/Profiles'

export const AppRoutes = () => {
  const SignIn = lazy(() => import('@/pages/SignIn'))

  const router = createBrowserRouter([
    {
      path: Routes.Root,
      element: (
        <Suspense fallback={<></>}>
          <Web3ProviderContextProvider>
            <MetamaskZkpSnapContextProvider>
              <App>
                <Outlet />
                <StatusMessage />
              </App>
            </MetamaskZkpSnapContextProvider>
          </Web3ProviderContextProvider>
        </Suspense>
      ),
      children: [
        {
          index: true,
          path: Routes.Profiles,
          element: <Profiles />,
        },
        {
          index: true,
          path: Routes.SignIn,
          element: <SignIn />,
        },
        {
          path: '/',
          element: <Navigate replace to={Routes.SignIn} />,
        },
        {
          path: '*',
          element: <Navigate replace to={Routes.SignIn} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

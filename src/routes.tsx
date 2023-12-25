import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom'

import App from '@/App'
import {
  MetamaskZkpSnapContextProvider,
  ToastsManager,
  Web3ProviderContextProvider,
} from '@/contexts'
import { Routes } from '@/enums'
import Profiles from '@/pages/Profiles'
import UiKit from '@/pages/UiKit'

export const AppRoutes = () => {
  const SignIn = lazy(() => import('@/pages/SignIn'))

  const router = createBrowserRouter([
    {
      path: Routes.Root,
      element: (
        <Suspense fallback={<></>}>
          <ToastsManager>
            <Web3ProviderContextProvider>
              <MetamaskZkpSnapContextProvider>
                <App>
                  <Outlet />
                </App>
              </MetamaskZkpSnapContextProvider>
            </Web3ProviderContextProvider>
          </ToastsManager>
        </Suspense>
      ),
      children: [
        {
          index: true,
          path: Routes.UiKit,
          element: <UiKit />,
        },
        {
          path: Routes.Profiles,
          element: <Profiles />,
        },
        {
          path: Routes.SignIn,
          element: <SignIn />,
        },
        {
          path: '/',
          element: <Navigate replace to={Routes.UiKit} />,
        },
        {
          path: '*',
          element: <Navigate replace to={Routes.UiKit} />,
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

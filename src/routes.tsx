import { lazy, Suspense } from 'react'
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom'

import App from '@/App'
import { StatusMessage } from '@/components'
import { MetamaskZkpSnapContextProvider, Web3ProviderContextProvider } from '@/contexts'
import { Routes } from '@/enums'
import Profiles from '@/pages/Profiles'

import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

export const AppRoutes = () => {
  const SignIn = lazy(() => import('@/pages/SignIn'))
  // TODO: Replace with real auth check
  const isAuthorized = true

  const signInGuard = () => (isAuthorized ? redirect(Routes.Root) : null)
  const authProtectedGuard = ({ request }: LoaderFunctionArgs) => {
    // If the user is not logged in and tries to access protected route, we redirect
    // them to sign in with a `from` parameter that allows login to redirect back
    // to this page upon successful authentication
    if (!isAuthorized) {
      const params = new URLSearchParams()
      params.set('from', new URL(request.url).pathname)
      return redirect(`${Routes.SignIn}?${params.toString()}`)
    }

    return null
  }

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
          element: <MainLayout />,
          children: [
            {
              index: true,
              path: Routes.Profiles,
              loader: authProtectedGuard,
              element: <Profiles />,
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

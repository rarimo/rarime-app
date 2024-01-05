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
import {
  MetamaskZkpSnapContextProvider,
  ToastsManager,
  Web3ProviderContextProvider,
} from '@/contexts'
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

  // TODO: Replace with real auth check
  const { isAuthorized } = useAuth()

  const signInGuard = () => (!isAuthorized ? redirect(RoutePaths.Root) : null)
  const authProtectedGuard = ({ request }: LoaderFunctionArgs) => {
    // If the user is not logged in and tries to access protected route, we redirect
    // them to sign in with a `from` parameter that allows login to redirect back
    // to this page upon successful authentication
    if (isAuthorized) {
      const params = new URLSearchParams()
      params.set('from', new URL(request.url).pathname)
      return redirect(`${RoutePaths.SignIn}?${params.toString()}`)
    }

    return null
  }

  const router = createBrowserRouter([
    {
      path: RoutePaths.Root,
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

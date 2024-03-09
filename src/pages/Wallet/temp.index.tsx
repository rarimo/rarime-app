import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import WalletRoot from './'
import Analytics from './pages/Analytics'

// TODO: Replace with Wallet index page
export default function Wallet() {
  return useNestedRoutes(RoutePaths.Wallet, [
    {
      index: true,
      element: <WalletRoot />,
    },
    {
      path: RoutePaths.WalletAnalytics,
      element: <Analytics />,
    },
    {
      path: '*',
      element: <Navigate replace to={RoutePaths.Wallet} />,
    },
  ])
}

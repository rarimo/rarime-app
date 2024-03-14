import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import Analytics from './pages/Analytics'
import WalletRoot from './pages/WalletRoot'

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

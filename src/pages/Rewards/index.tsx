import { Box } from '@mui/material'
import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import RewardsLayout from './components/RewardsLayout'

export default function Rewards() {
  return useNestedRoutes(RoutePaths.Rewards, [
    {
      index: true,
      element: <Navigate replace to={RoutePaths.RewardsActive} />,
    },
    {
      path: RoutePaths.RewardsActive,
      element: (
        <RewardsLayout>
          <Box>active</Box>
        </RewardsLayout>
      ),
    },
    {
      path: RoutePaths.RewardsHistory,
      element: (
        <RewardsLayout>
          <Box>history</Box>
        </RewardsLayout>
      ),
    },
    {
      path: RoutePaths.RewardsActiveId,
      element: <Box>active id</Box>,
    },
    {
      path: '*',
      element: <Navigate replace to={RoutePaths.RewardsActive} />,
    },
  ])
}

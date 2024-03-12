import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import About from './pages/About'
import EarnHistory from './pages/EarnHistory'
import EventId from './pages/EventId'
import Leaderboard from './pages/Leaderboard'
import RewardsRoot from './pages/RewardsRoot'

export default function Rewards() {
  return useNestedRoutes(RoutePaths.Rewards, [
    {
      index: true,
      element: <RewardsRoot />,
    },
    {
      path: RoutePaths.RewardsEarnHistory,
      element: <EarnHistory />,
    },
    {
      path: RoutePaths.RewardsEventId,
      element: <EventId />,
    },
    {
      path: RoutePaths.RewardsLeaderboard,
      element: <Leaderboard />,
    },
    {
      path: RoutePaths.RewardsAbout,
      element: <About />,
    },
    {
      path: '*',
      element: <Navigate replace to={RoutePaths.Rewards} />,
    },
  ])
}

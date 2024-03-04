import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import RewardsLayout from './components/RewardsLayout'
import About from './pages/About'
import ActiveTasks from './pages/ActiveTasks'
import ActiveTasksId from './pages/ActiveTasksId'
import History from './pages/History'
import Leaderboard from './pages/Leaderboard'

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
          <ActiveTasks />
        </RewardsLayout>
      ),
    },
    {
      path: RoutePaths.RewardsHistory,
      element: <History />,
    },
    {
      path: RoutePaths.RewardsActiveId,
      element: <ActiveTasksId />,
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
      element: <Navigate replace to={RoutePaths.RewardsActive} />,
    },
  ])
}

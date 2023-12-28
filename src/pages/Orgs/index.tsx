import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/helpers'

import { OrgsId, OrgsNew, OrgsRoot } from './pages'

export default function Orgs() {
  return useNestedRoutes(RoutePaths.Orgs, [
    {
      index: true,
      element: <Navigate replace to={RoutePaths.OrgsAll} />,
    },
    {
      path: RoutePaths.OrgsAll,
      element: <OrgsRoot />,
    },
    {
      path: RoutePaths.OrgsMy,
      element: <OrgsRoot />,
    },
    {
      path: RoutePaths.OrgsNew,
      element: <OrgsNew />,
    },
    {
      path: RoutePaths.OrgsId,
      element: <OrgsId />,
    },
  ])
}

import { Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import { OrgsId, OrgsList, OrgsNew } from './pages'

export default function Orgs() {
  return useNestedRoutes(RoutePaths.Orgs, [
    {
      index: true,
      element: <Navigate replace to={RoutePaths.OrgsList} />,
    },
    {
      path: RoutePaths.OrgsList,
      element: <OrgsList />,
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

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'

import { OrgCheckProof, OrgRoot } from './pages'

export default function OrgsId() {
  return useNestedRoutes(RoutePaths.OrgsId, [
    {
      index: true,
      element: <OrgRoot />,
    },
    {
      path: RoutePaths.OrgsIdCheckProof,
      element: <OrgCheckProof />,
    },
  ])
}
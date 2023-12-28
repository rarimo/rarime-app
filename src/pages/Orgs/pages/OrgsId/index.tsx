import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/helpers'

import { CheckProof, Root } from './pages'

export default function Org() {
  return useNestedRoutes(RoutePaths.OrgsId, [
    {
      index: true,
      element: <Root />,
    },
    {
      path: RoutePaths.OrgsIdCheckProof,
      element: <CheckProof />,
    },
  ])
}

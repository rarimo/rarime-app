import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'
import { OrgDetailsContextProvider } from '@/pages/Orgs/pages/OrgsId/contexts'

import { OrgCheckProof, OrgRoot } from './pages'

export default function OrgsId() {
  const nestedRoutes = useNestedRoutes(RoutePaths.OrgsId, [
    {
      index: true,
      element: <OrgRoot />,
    },
    {
      path: RoutePaths.OrgsIdCheckProof,
      element: <OrgCheckProof />,
    },
  ])

  return <OrgDetailsContextProvider>{nestedRoutes}</OrgDetailsContextProvider>
}

import { generatePath, Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'
import { OrgDetailsContextProvider } from '@/pages/Orgs/pages/OrgsId/contexts'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'

import { OrgGroups, OrgRoot } from './pages'

function OrgsIdRouter() {
  const { isOrgOwner, org } = useOrgDetails()

  return useNestedRoutes(RoutePaths.OrgsId, [
    {
      index: true,
      element: <OrgRoot />,
    },
    {
      path: RoutePaths.OrgsIdGroups,
      element: isOrgOwner ? (
        <OrgGroups />
      ) : (
        <Navigate
          to={generatePath(RoutePaths.OrgsId, {
            id: org.id,
          })}
        />
      ),
    },
  ])
}

export default function OrgsId() {
  return (
    <OrgDetailsContextProvider>
      <OrgsIdRouter />
    </OrgDetailsContextProvider>
  )
}

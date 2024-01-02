import { Divider, Stack } from '@mui/material'
import { generatePath, Navigate } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/hooks'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { OrgGroupDetailsContextProvider } from '@/pages/Orgs/pages/OrgsId/pages/OrgGroups/context'
import { OrgGroupsId, OrgGroupsNew } from '@/pages/Orgs/pages/OrgsId/pages/OrgGroups/pages'

export default function OrgGroups() {
  const { org, orgGroups, orgTabs } = useOrgDetails()

  const routes = useNestedRoutes(RoutePaths.OrgsIdGroups, [
    {
      index: true,
      element: (
        <Navigate
          replace
          to={
            orgGroups.length
              ? generatePath(RoutePaths.OrgsIdGroupsIdList, {
                  id: org.id,
                  groupId: orgGroups[0].id,
                })
              : generatePath(RoutePaths.OrgsIdGroupsNew, {
                  id: org.id,
                })
          }
        />
      ),
    },
    {
      path: RoutePaths.OrgsIdGroupsIdList,
      element: (
        <OrgGroupDetailsContextProvider>
          <OrgGroupsId />
        </OrgGroupDetailsContextProvider>
      ),
    },
    {
      path: RoutePaths.OrgsIdGroupsNew,
      element: <OrgGroupsNew />,
    },
  ])

  return (
    <Stack flex={1}>
      {orgTabs}

      <Divider sx={{ my: 6 }} />

      <Stack flex={1}>{routes}</Stack>
    </Stack>
  )
}

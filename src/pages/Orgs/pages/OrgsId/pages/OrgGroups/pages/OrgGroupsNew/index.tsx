import { Stack } from '@mui/material'
import { useCallback } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'

import { OrgGroup } from '@/api/modules/orgs'
import { RoutePaths } from '@/enums'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'

import { CreateGroupForm } from './components'

export default function OrgGroupsNew() {
  const { org } = useOrgDetails()

  const navigate = useNavigate()

  const handleGroupCreate = useCallback(
    (orgGroup: OrgGroup) => {
      navigate(generatePath(RoutePaths.OrgsIdGroupsIdList, { id: org.id, groupId: orgGroup.id }))
    },
    [navigate, org.id],
  )
  return (
    <Stack flex={1}>
      <CreateGroupForm onGroupCreated={handleGroupCreate} />
    </Stack>
  )
}

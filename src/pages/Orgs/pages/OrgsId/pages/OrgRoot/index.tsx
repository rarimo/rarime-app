import { Box, Stack } from '@mui/material'
import { generatePath, NavLink } from 'react-router-dom'

import { PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { UiButton } from '@/ui'

export default function OrgRoot() {
  const { org, isAccountOwner, orgTabs } = useOrgDetails()

  return (
    <Stack flex={1}>
      {isAccountOwner ? (
        orgTabs
      ) : (
        <PageTitles title={`Organization ${org.id}`} subtitle='Some organization description' />
      )}

      <Box mt={6}>
        <NavLink to={generatePath(RoutePaths.OrgsIdCheckProof, { id: org.id })}>
          <UiButton component='div'>Check proof</UiButton>
        </NavLink>
      </Box>
    </Stack>
  )
}

import { Stack, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { UiIcon } from '@/ui'

import { LinksBlock, OrgOverview, VerifyProofsBlock } from './components'

export default function OrgRoot() {
  const { isOrgOwner, orgTabs } = useOrgDetails()
  const { palette } = useTheme()

  return (
    <Stack flex={1} spacing={6}>
      {isOrgOwner && orgTabs}

      <NavLink to={RoutePaths.Orgs}>
        <Stack direction={'row'} alignItems={'center'} spacing={2} color={palette.text.secondary}>
          <UiIcon componentName={'chevronLeft'} size={5} />
          <Typography variant={'buttonSmall'} color={'inherit'}>
            Go Back
          </Typography>
        </Stack>
      </NavLink>

      <Stack mt={6} spacing={6}>
        <OrgOverview />
        <VerifyProofsBlock />
        <LinksBlock />
      </Stack>
    </Stack>
  )
}

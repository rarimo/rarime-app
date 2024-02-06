import { Box, Stack, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { UiIcon } from '@/ui'

import { LinksBlock, OrgOverview, VerifyProofsBlock } from './components'

export default function OrgRoot() {
  const { isOrgOwner, orgTabs } = useOrgDetails()
  const { palette } = useTheme()

  return (
    <Stack flex={1} spacing={6} position={'relative'}>
      <Box display={'grid'} gridTemplateColumns={'1fr auto 1fr'} alignItems={'center'}>
        <Stack
          component={NavLink}
          to={RoutePaths.Orgs}
          direction={'row'}
          alignItems={'center'}
          spacing={2}
          color={palette.text.secondary}
        >
          <UiIcon componentName={'chevronLeft'} size={5} />
          <Typography variant={'buttonSmall'} color={'inherit'}>
            View all organizations
          </Typography>
        </Stack>
        {isOrgOwner && orgTabs}
      </Box>

      <OrgOverview />
      <VerifyProofsBlock />
      <LinksBlock />
    </Stack>
  )
}

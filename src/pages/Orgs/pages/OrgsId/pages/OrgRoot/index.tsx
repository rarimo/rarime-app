import { Box, Stack, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { UiIcon } from '@/ui'

import { LinksBlock, OrgOverview, VerifyProofsBlock } from './components'

export default function OrgRoot() {
  const { org, isOrgOwner, orgTabs } = useOrgDetails()
  const { palette, spacing } = useTheme()

  return (
    <Stack flex={1}>
      {isOrgOwner ? (
        orgTabs
      ) : (
        <Box position={'relative'}>
          <Box position={'absolute'}>
            <NavLink to={RoutePaths.Orgs}>
              <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={2}
                color={palette.text.secondary}
              >
                <UiIcon componentName={'chevronLeft'} size={5} />
                <Typography variant='button' color={'inherit'}>
                  Back
                </Typography>
              </Stack>
            </NavLink>
          </Box>

          <Stack mt={2} spacing={6} width={'100%'} maxWidth={spacing(200)} mx={'auto'}>
            <OrgOverview org={org} />
            <VerifyProofsBlock />
            <LinksBlock />
          </Stack>
        </Box>
      )}
    </Stack>
  )
}

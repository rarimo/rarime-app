import { Box, Stack, Typography, useTheme } from '@mui/material'
import { generatePath, NavLink, useParams } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { UiIcon } from '@/ui'

export default function CheckProofHead() {
  const { id = null } = useParams<{ id: string }>()
  const { palette, spacing } = useTheme()

  return (
    <Box position={'relative'} mx={-8} px={6} pb={6} borderBottom={1} borderColor={palette.divider}>
      <Box position={'absolute'} top={spacing(1)} left={0}>
        <NavLink to={generatePath(RoutePaths.OrgsId, { id })}>
          <Stack direction={'row'} alignItems={'center'} spacing={2} color={palette.text.secondary}>
            <UiIcon componentName={'chevronLeft'} size={5} />
            <Typography variant='buttonSmall' color={'inherit'}>
              View organization
            </Typography>
          </Stack>
        </NavLink>
      </Box>

      <Typography variant='h6' textAlign={'center'}>
        Check Proof
      </Typography>
    </Box>
  )
}

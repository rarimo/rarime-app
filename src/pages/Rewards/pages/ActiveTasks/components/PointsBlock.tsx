import { Divider, Stack, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { Icons, RoutePaths } from '@/enums'
import { UiButton, UiIcon } from '@/ui'

import LevelProgress from './LevelProgress'

export default function PointsBlock() {
  const { palette, spacing } = useTheme()

  return (
    <Stack
      p={6}
      spacing={4}
      bgcolor={palette.background.light}
      border={1}
      borderColor={palette.additional.layerBorder}
      borderRadius={4}
    >
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={4}>
        <Stack spacing={2}>
          <Typography variant='body3' color={palette.text.secondary}>
            Points
          </Typography>
          <Typography variant='h4'>120</Typography>
        </Stack>

        <UiButton
          component={NavLink}
          to={RoutePaths.RewardsLeaderboard}
          color='secondary'
          size='medium'
          sx={{ height: spacing(9), px: 3 }}
        >
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <UiIcon name={Icons.Trophy} size={5} />
              <Typography variant='subtitle4'>241</Typography>
            </Stack>
            <Divider sx={{ width: spacing(2), bgcolor: palette.action.hover }} />
            <Typography variant='buttonMedium'>Leaderboard</Typography>
            <UiIcon componentName='chevronRight' size={4} sx={{ color: palette.text.secondary }} />
          </Stack>
        </UiButton>
      </Stack>
      <LevelProgress />
    </Stack>
  )
}

import { Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { Icons, RoutePaths } from '@/enums'
import { UiButton, UiIcon } from '@/ui'

import LevelProgress from './LevelProgress'

export default function BalanceBlock() {
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
            Reserved
          </Typography>
          <Typography variant='h4'>120 RMO</Typography>
        </Stack>

        <UiButton
          component={NavLink}
          to={RoutePaths.RewardsLeaderboard}
          color='warning'
          size='medium'
          sx={{ height: spacing(9), px: 3 }}
        >
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <UiIcon name={Icons.Trophy} size={5} />
              <Typography variant='subtitle4'>241</Typography>
            </Stack>
            <Typography variant='buttonMedium'>Leaderboard</Typography>
            <UiIcon componentName='chevronRight' size={4} />
          </Stack>
        </UiButton>
      </Stack>
      <Divider />
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Button
          color='secondary'
          size='medium'
          startIcon={<UiIcon name={Icons.Swap} size={5} />}
          sx={{ width: spacing(60), height: spacing(10) }}
        >
          Withdraw
        </Button>
        <LevelProgress width={spacing(80)} />
      </Stack>
    </Stack>
  )
}

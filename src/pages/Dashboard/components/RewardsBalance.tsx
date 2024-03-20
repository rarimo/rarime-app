import { Button, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { Icons, RoutePaths } from '@/enums'
import { formatNumber } from '@/helpers'
import { useRewardsState } from '@/store'
import { UiIcon } from '@/ui'

export default function RewardsBalance() {
  const { palette } = useTheme()
  const { balance } = useRewardsState()

  return (
    <Paper component={Stack} spacing={6}>
      <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={4}>
        <Stack spacing={2}>
          <Stack direction='row' spacing={1}>
            <Typography variant='body3' color={palette.text.secondary}>
              Reserved RMO
            </Typography>
            <IconButton size='small' color='secondary' component={NavLink} to={RoutePaths.Rewards}>
              <UiIcon name={Icons.CaretRight} size={4} />
            </IconButton>
          </Stack>
          <Typography variant='h4'>{formatNumber(balance?.amount ?? 0)}</Typography>
        </Stack>

        <Button
          component={NavLink}
          to={RoutePaths.RewardsLeaderboard}
          color='warning'
          size='medium'
          startIcon={<UiIcon name={Icons.Trophy} size={4} />}
          endIcon={<UiIcon name={Icons.CaretRight} size={4} />}
          sx={{ px: 4 }}
        >
          <Typography variant='subtitle5'>
            {balance?.rank ? `#${balance.rank} -` : ''} Leaderboard
          </Typography>
        </Button>
      </Stack>
    </Paper>
  )
}

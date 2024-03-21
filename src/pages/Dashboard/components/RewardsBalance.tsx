import { Button, Paper, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { Icons, RoutePaths } from '@/enums'
import { formatNumber } from '@/helpers'
import { useRewardsState } from '@/store'
import { UiIcon } from '@/ui'

export default function RewardsBalance() {
  const { balance } = useRewardsState()

  return (
    <Paper component={Stack} spacing={6}>
      <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={4}>
        <Stack spacing={2}>
          <Button
            component={NavLink}
            to={RoutePaths.Rewards}
            variant='text'
            color='secondary'
            sx={{ gap: 1 }}
          >
            <Typography variant='body3'>Reserved RMO</Typography>
            <UiIcon name={Icons.CaretRight} size={4} />
          </Button>
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

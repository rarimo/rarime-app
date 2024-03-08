import { Grid, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { Balance } from '@/api/modules/points'
import { useRewardsState } from '@/store'

import LeaderboardItem from './LeaderboardItem'

interface Props {
  leaderboard: Balance[]
}

export default function LeaderboardList({ leaderboard }: Props) {
  const { palette } = useTheme()
  const { balance } = useRewardsState()

  const hasMyBalance = useMemo(() => {
    return leaderboard.some(participant => participant.id === balance?.id)
  }, [balance, leaderboard])

  return (
    <Stack spacing={4}>
      <Grid container spacing={16}>
        <Grid item xs={2}>
          <Typography variant='overline3' color={palette.text.secondary}>
            Place
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='overline3' color={palette.text.secondary}>
            User
          </Typography>
        </Grid>
        <Grid item xs={4} justifySelf={'end'} textAlign={'right'}>
          <Typography variant='overline3' color={palette.text.secondary}>
            Reserved
          </Typography>
        </Grid>
      </Grid>
      <Stack>
        {leaderboard.map((participant, index) => (
          <LeaderboardItem key={participant.id} balance={participant} rank={index + 1} />
        ))}

        {balance && !hasMyBalance && <LeaderboardItem balance={balance} rank={balance.rank} />}
      </Stack>
    </Stack>
  )
}

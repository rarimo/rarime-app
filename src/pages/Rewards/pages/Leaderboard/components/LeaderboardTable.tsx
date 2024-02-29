import { Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { Balance } from '@/api/modules/points'

import LeaderboardRow from './LeaderboardRow'

interface Props {
  leaderboard: Balance[]
  balance: Balance
}

export default function LeaderboardTable({ leaderboard, balance }: Props) {
  const { palette } = useTheme()

  const hasMyBalance = useMemo(() => {
    return leaderboard.some(participant => participant.id === balance.id)
  }, [balance.id, leaderboard])

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
      <Divider />
      {leaderboard.map((participant, index) => (
        <Stack spacing={4} key={participant.id}>
          <LeaderboardRow balance={participant} rank={index + 1} />
          {index !== leaderboard.length - 1 && <Divider />}
        </Stack>
      ))}

      {!hasMyBalance && <LeaderboardRow balance={balance} rank={balance.rank} />}
    </Stack>
  )
}

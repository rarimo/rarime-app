import { Paper, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'

import { getLeaderboard } from '@/api/modules/points'
import { BackLink, InfiniteList } from '@/common'
import { RoutePaths } from '@/enums'
import { useMultiPageLoading } from '@/hooks'
import { rewardsStore } from '@/store'

import LeaderboardList from './components/LeaderboardList'

export default function Leaderboard() {
  const { data: leaderboard, loadingState, load } = useMultiPageLoading(() => getLeaderboard())

  useEffect(() => {
    rewardsStore.loadBalance()
  }, [])

  return (
    <Stack spacing={6}>
      <BackLink to={RoutePaths.Rewards} />
      <Paper component={Stack} spacing={4}>
        <Typography variant='subtitle3'>Leaderboard</Typography>
        <InfiniteList
          items={leaderboard}
          loadingState={loadingState}
          errorTitle='Leaderbord cannot be loaded :('
          noDataTitle='Leaderboard is empty'
          // For now displaying only the first page
          onLoadNext={() => {}}
          onRetry={load}
        >
          <LeaderboardList leaderboard={leaderboard} />
        </InfiniteList>
      </Paper>
    </Stack>
  )
}

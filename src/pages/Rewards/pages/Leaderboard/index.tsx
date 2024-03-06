import { Paper, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'

import { getLeaderboard } from '@/api/modules/points'
import BackLink from '@/common/BackLink'
import InfiniteList from '@/common/InfiniteList'
import { RoutePaths } from '@/enums'
import { useMultiPageLoading } from '@/hooks/multi-page-loading'
import { rewardsStore, useRewardsState } from '@/store/modules/rewards.module'

import LeaderboardTable from './components/LeaderboardTable'

export default function Leaderboard() {
  const { balance } = useRewardsState()

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
          // Now loading only the first page
          onLoadNext={() => {}}
          onRetry={load}
        >
          <LeaderboardTable leaderboard={leaderboard} balance={balance} />
        </InfiniteList>
      </Paper>
    </Stack>
  )
}

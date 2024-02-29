import { CircularProgress, Paper, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { useBalance, useLeaderboard } from '@/api/modules/points'
import { NoDataViewer } from '@/common'
import ErrorViewer from '@/common/ErrorViewer'
import { RoutePaths } from '@/enums'
import { useIdentityState } from '@/store'
import { UiButton, UiIcon } from '@/ui'

import LeaderboardTable from './components/LeaderboardTable'

export default function Leaderboard() {
  const { userDid } = useIdentityState()

  const {
    leaderboard,
    isLoading: isLeaderboardLoading,
    isLoadingError: isLeaderboardLoadingError,
    isEmpty: isLeaderboardEmpty,
  } = useLeaderboard()

  const {
    balance,
    isLoading: isBalanceLoading,
    isLoadingError: isBalanceLoadingError,
  } = useBalance(userDid)

  return (
    <Stack spacing={6}>
      <UiButton
        component={NavLink}
        to={RoutePaths.Rewards}
        variant='text'
        color='secondary'
        size='small'
        startIcon={<UiIcon componentName={'chevronLeft'} size={5} />}
        sx={{ width: 'fit-content' }}
      >
        Active Tasks
      </UiButton>

      <Paper component={Stack} spacing={4}>
        <Typography variant='subtitle3'>Leaderboard</Typography>
        {isLeaderboardLoading || isBalanceLoading ? (
          <Stack alignItems='center' p={20}>
            <CircularProgress color={'secondary'} />
          </Stack>
        ) : isLeaderboardLoadingError || isBalanceLoadingError ? (
          <ErrorViewer title='Leaderbord cannot be loaded :(' />
        ) : isLeaderboardEmpty || !balance ? (
          <NoDataViewer title='Leaderboard is empty' />
        ) : (
          <LeaderboardTable leaderboard={leaderboard} balance={balance} />
        )}
      </Paper>
    </Stack>
  )
}

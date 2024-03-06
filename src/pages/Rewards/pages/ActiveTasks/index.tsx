import { Skeleton, Stack, useTheme } from '@mui/material'

import { useLoading } from '@/hooks'
import { rewardsStore, useRewardsState } from '@/store/modules/rewards.module'

import BalanceBlock from './components/BalanceBlock'
import EnterProgram from './components/EnterProgram'
import LimitedEvents from './components/LimitedEvents'
import TasksList from './components/TasksList'

export default function ActiveTasks() {
  const { spacing } = useTheme()
  const { balance } = useRewardsState()
  const { isLoading } = useLoading(undefined, rewardsStore.loadBalance)

  return (
    <Stack spacing={4}>
      {isLoading ? (
        <>
          <Skeleton height={spacing(52)} sx={{ borderRadius: 4 }} />
          <Skeleton height={spacing(45)} sx={{ borderRadius: 4 }} />
          <Skeleton height={spacing(50)} sx={{ borderRadius: 4 }} />
        </>
      ) : balance ? (
        <>
          <BalanceBlock />
          <LimitedEvents />
          <TasksList />
        </>
      ) : (
        <EnterProgram />
      )}
    </Stack>
  )
}

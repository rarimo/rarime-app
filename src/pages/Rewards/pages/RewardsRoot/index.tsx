import { Button, Skeleton, Stack, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useLoading } from '@/hooks'
import { rewardsStore, useRewardsState } from '@/store/modules/rewards.module'
import { UiIcon } from '@/ui'

import BalanceBlock from './components/BalanceBlock'
import EnterProgram from './components/EnterProgram'
import LimitedEvents from './components/LimitedEvents'
import ProgramDetails from './components/ProgramDetails'
import TasksList from './components/TasksList'

export default function RewardsRoot() {
  const { spacing } = useTheme()
  const { balance, isAuthorized } = useRewardsState()
  const { isLoading } = useLoading(undefined, rewardsStore.loadBalance, {
    loadArgs: [isAuthorized],
  })

  return (
    <Stack spacing={8}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <PageTitles title='Rewards' />
        {!!balance && (
          <Button
            component={NavLink}
            to={RoutePaths.RewardsEarnHistory}
            variant='text'
            size='small'
            color='secondary'
            startIcon={<UiIcon componentName='history' size={4} />}
          >
            Earn History
          </Button>
        )}
      </Stack>
      <Stack spacing={4}>
        {balance ? (
          <>
            <BalanceBlock />
            <LimitedEvents />
            <TasksList />
          </>
        ) : isLoading ? (
          <>
            <Skeleton height={spacing(52)} sx={{ borderRadius: 4 }} />
            <Skeleton height={spacing(45)} sx={{ borderRadius: 4 }} />
            <Skeleton height={spacing(50)} sx={{ borderRadius: 4 }} />
          </>
        ) : isAuthorized ? (
          <ProgramDetails />
        ) : (
          <EnterProgram />
        )}
      </Stack>
    </Stack>
  )
}

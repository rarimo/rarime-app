import { Button, Skeleton, Stack, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

import { PageTitles } from '@/common'
import { Icons, RoutePaths } from '@/enums'
import { useLoading } from '@/hooks'
import { rewardsStore, useRewardsState } from '@/store'
import { UiIcon } from '@/ui'

import ActiveEventsList from './components/ActiveEventsList'
import BalanceBlock from './components/BalanceBlock'
import EnterProgram from './components/EnterProgram'
import ProgramAuth from './components/ProgramAuth'

export default function RewardsRoot() {
  const { spacing } = useTheme()
  const { balance, isAuthorized } = useRewardsState()
  const { isLoading } = useLoading(undefined, rewardsStore.loadBalance, {
    loadArgs: [isAuthorized],
  })

  const isBalanceActive = useMemo(() => {
    return !!balance && !balance.is_disabled
  }, [balance])

  return (
    <Stack spacing={8}>
      <Stack direction='row' justifyContent='space-between'>
        <PageTitles title='Rewards' />
        {isBalanceActive && (
          <Button
            component={NavLink}
            to={RoutePaths.RewardsEarnHistory}
            variant='text'
            size='small'
            color='secondary'
            startIcon={<UiIcon name={Icons.History} size={4} />}
          >
            Earn History
          </Button>
        )}
      </Stack>
      <Stack spacing={4}>
        {isBalanceActive ? (
          <>
            <BalanceBlock />
            <ActiveEventsList />
          </>
        ) : isLoading ? (
          <>
            <Skeleton height={spacing(52)} />
            <Skeleton height={spacing(45)} />
            <Skeleton height={spacing(50)} />
          </>
        ) : isAuthorized ? (
          <EnterProgram />
        ) : (
          <ProgramAuth />
        )}
      </Stack>
    </Stack>
  )
}

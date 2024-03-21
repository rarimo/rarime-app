import { Skeleton, Stack, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { PageTitles } from '@/common'
import { useLoading } from '@/hooks'
import { rewardsStore, useRewardsState } from '@/store'

import LatestCredentials from './components/LatestCredentials'
import RarimeAppBlock from './components/RarimeAppBlock'
import RewardsBalance from './components/RewardsBalance'
import RewardsIntro from './components/RewardsIntro'

export default function Dashboard() {
  const { balance } = useRewardsState()
  const { spacing } = useTheme()

  const { isLoading } = useLoading(undefined, rewardsStore.loadBalance)

  const isBalanceActive = useMemo(() => {
    return !!balance && !balance.is_disabled
  }, [balance])

  return (
    <Stack spacing={8}>
      <PageTitles title='Dashboard' />
      <Stack spacing={4}>
        {isBalanceActive ? (
          <RewardsBalance />
        ) : isLoading ? (
          <Skeleton height={spacing(30)} />
        ) : (
          <RewardsIntro />
        )}
        <LatestCredentials />
        {!isLoading && !isBalanceActive && <RarimeAppBlock />}
      </Stack>
    </Stack>
  )
}

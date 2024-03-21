import { Skeleton, Stack, useTheme } from '@mui/material'

import { BackLink, PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useLoading } from '@/hooks'
import { useWalletState, walletStore } from '@/store'

import BalanceHistory from './components/BalanceHistory'

export default function Analytics() {
  const { spacing } = useTheme()
  const { balances } = useWalletState()
  const { isLoading } = useLoading(
    undefined,
    async () => {
      await walletStore.connect()
      await walletStore.loadBalances()
    },
    {
      loadOnMount: true,
    },
  )

  return (
    <Stack spacing={6}>
      <BackLink to={RoutePaths.Wallet} />
      {/* TODO: Remove test data when real data is available */}
      <PageTitles title='Wallet Analytics (test data)' />
      {!balances.length && isLoading ? <Skeleton height={spacing(132)} /> : <BalanceHistory />}
    </Stack>
  )
}

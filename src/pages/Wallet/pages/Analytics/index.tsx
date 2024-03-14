import { Skeleton, Stack, useTheme } from '@mui/material'

import { BackLink, PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useLoading } from '@/hooks'
import { useWalletState, walletStore } from '@/store'

import BalanceHistory from './components/BalanceHistory'

export default function Analytics() {
  const { spacing } = useTheme()
  const { balances } = useWalletState()
  const { isLoading } = useLoading(undefined, walletStore.connect, {
    loadOnMount: true,
  })

  return (
    <Stack spacing={6}>
      <BackLink to={RoutePaths.Wallet} />
      <PageTitles title='Wallet Analytics' />
      {!balances.length && isLoading ? (
        <Skeleton variant='rounded' height={spacing(132)} sx={{ borderRadius: 4 }} />
      ) : (
        <BalanceHistory />
      )}
    </Stack>
  )
}

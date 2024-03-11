import { Button, Skeleton, Stack, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useLoading } from '@/hooks'
import { useWalletState, walletStore } from '@/store'
import { UiIcon } from '@/ui'

import BalanceHistory from './components/BalanceHistory'

export default function Analytics() {
  const { spacing } = useTheme()
  const { balance } = useWalletState()
  const { isLoading } = useLoading(undefined, walletStore.connect, {
    loadOnMount: true,
  })

  return (
    <Stack spacing={6}>
      {/* TODO: Replace with BackLink when available */}
      <Button
        component={NavLink}
        to={RoutePaths.Wallet}
        variant='text'
        color='secondary'
        startIcon={<UiIcon componentName='chevronLeft' size={5} />}
        sx={{ width: 'fit-content' }}
      >
        Go back
      </Button>
      <PageTitles title={'Wallet Analytics'} />
      {!balance && isLoading ? (
        <Skeleton variant='rounded' height={spacing(132)} sx={{ borderRadius: 4 }} />
      ) : (
        <BalanceHistory />
      )}
    </Stack>
  )
}

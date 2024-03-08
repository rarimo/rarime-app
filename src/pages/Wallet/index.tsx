import {
  alpha,
  Button,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { CHAINS } from '@rarimo/rarime-connector'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { rarimeWallet } from '@/api/clients'
import { NoDataViewer, PageTitles } from '@/common'
import { Icons } from '@/enums'
import { formatAmount } from '@/helpers'
import { useLoading } from '@/hooks'
import { useWalletState, walletStore } from '@/store'
import { UiIcon } from '@/ui'

import { ReceiveModal } from './components'

export default function Wallet() {
  const { spacing, palette } = useTheme()

  const { balance } = useWalletState()

  const chainInfo = useMemo(() => {
    return CHAINS[rarimeWallet.chainId]
  }, [])

  const { isLoading, isLoadingError } = useLoading(undefined, walletStore.connect, {
    loadOnMount: true,
  })

  if (isLoading)
    return (
      <Stack>
        <PageTitles title='Wallet' />

        <Skeleton height={spacing(80)} />
        <Skeleton height={spacing(50)} />
        <Skeleton height={spacing(50)} />
      </Stack>
    )

  if (isLoadingError)
    return (
      <Stack spacing={4}>
        <PageTitles title='Wallet' />

        <NoDataViewer title='Error loading wallet' />
      </Stack>
    )

  return (
    <Stack spacing={4}>
      <PageTitles title='Wallet' />

      <Paper sx={{ mt: spacing(8) }}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography color={alpha(palette.text.secondary, 0.6)}>
              {`Available ${chainInfo.currencies[0].coinDenom}`}
            </Typography>
            <Typography variant='h4'>
              {formatAmount(balance ?? '0', chainInfo.currencies[0].coinDecimals)}
            </Typography>
          </Stack>
          <Divider />
          <Stack spacing={3} direction='row' alignItems='center' justifyContent='space-between'>
            <Stack spacing={3} direction='row'>
              <Button color='secondary' startIcon={<UiIcon componentName='add' />}>
                Buy
              </Button>

              <ReceiveModal />

              <Button color='secondary' startIcon={<UiIcon componentName='arrowUpward' />}>
                Send
              </Button>
            </Stack>
            <Button
              component={Link}
              to=''
              startIcon={
                <UiIcon
                  componentName='showChart'
                  sx={{
                    borderLeft: `2px solid`,
                    borderBottom: `2px solid`,
                    borderColor: alpha(palette.text.secondary, 0.6),
                    color: alpha(palette.text.secondary, 0.6),
                  }}
                  size={4}
                />
              }
              variant='text'
            >
              <Typography variant='buttonMedium' sx={{ color: alpha(palette.text.secondary, 0.6) }}>
                Wallet Analytics
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper>
        <Stack direction='row' spacing={4} alignItems='center'>
          <Stack
            width={spacing(12)}
            height={spacing(12)}
            bgcolor={palette.action.active}
            borderRadius='50%'
            justifyContent='center'
            alignItems='center'
          >
            <UiIcon name={Icons.Rarime} />
          </Stack>

          <Stack spacing={1}>
            <Typography variant='subtitle3'>Earn RMO</Typography>
            <Typography color={alpha(palette.text.secondary, 0.6)}>Scan your passport</Typography>
          </Stack>

          <IconButton sx={{ background: palette.primary.main, p: 1, ml: 'auto' }}>
            <UiIcon componentName='chevronRight' size={5} />
          </IconButton>
        </Stack>
      </Paper>

      <Paper>
        <Stack spacing={2}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography>History</Typography>
            <UiIcon componentName='chevronRight' />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  )
}

import {
  Button,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { ErrorView, NoDataView, PageTitles } from '@/common'
import { Icons } from '@/enums'
import { formatBalance } from '@/helpers'
import { useLoading } from '@/hooks'
import { useWalletState, walletStore } from '@/store'
import { UiIcon } from '@/ui'

import { ReceiveModal, SendModal } from './components'

export default function Wallet() {
  const { spacing, palette } = useTheme()

  const { balances } = useWalletState()

  const [isReceiveModalShown, setIsReceiveModalShown] = useState(false)
  const [isSendModalShown, setIsSendModalShown] = useState(false)

  const mainBalance = useMemo(() => balances?.[0], [balances])

  const { isLoading, isLoadingError, reload } = useLoading(
    undefined,
    async () => {
      await walletStore.connect()
      await walletStore.loadBalances()
    },
    {
      loadOnMount: true,
    },
  )

  const handleSend = useCallback(async () => {
    setIsSendModalShown(false)
    await reload()
  }, [reload])

  if (isLoading)
    return (
      <Stack spacing={4}>
        <PageTitles title='Wallet' />

        <Paper>
          <Skeleton variant='rectangular' height={spacing(37)} />
        </Paper>
        <Paper>
          <Skeleton variant='rectangular' height={spacing(12)} />
        </Paper>
        <Paper>
          <Stack spacing={2}>
            <Skeleton variant='rectangular' height={spacing(6)} width={spacing(15)} />

            <Skeleton variant='rectangular' height={spacing(37.5)} />
          </Stack>
        </Paper>
      </Stack>
    )

  if (isLoadingError)
    return (
      <Stack spacing={4}>
        <PageTitles title='Wallet' />

        <ErrorView title='Error loading wallet' />
      </Stack>
    )

  return (
    <Stack spacing={4}>
      <PageTitles title='Wallet' />

      <Paper sx={{ mt: spacing(8) }}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Typography color={palette.text.secondary}>
              {`Available ${mainBalance?.denom}`}
            </Typography>
            <Typography variant='h4'>
              {formatBalance(mainBalance?.amount, mainBalance?.decimals)}
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={3} direction='row' alignItems='center' justifyContent='space-between'>
            <Stack spacing={3} direction='row'>
              <Button
                color='secondary'
                startIcon={<UiIcon componentName='arrowDownward' />}
                onClick={() => setIsReceiveModalShown(true)}
              >
                Receive
              </Button>
              <ReceiveModal
                open={isReceiveModalShown}
                onClose={() => setIsReceiveModalShown(false)}
              />

              <Button
                color='secondary'
                startIcon={<UiIcon componentName='arrowUpward' />}
                onClick={() => setIsSendModalShown(true)}
              >
                Send
              </Button>
              <SendModal
                open={isSendModalShown}
                onClose={() => setIsSendModalShown(false)}
                onSend={handleSend}
              />
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
                    borderColor: palette.text.secondary,
                  }}
                  size={4}
                />
              }
              color='secondary'
              variant='text'
            >
              <Typography variant='buttonMedium'>Wallet Analytics</Typography>
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
            <UiIcon name={Icons.Rarimo} />
          </Stack>

          <Stack spacing={1}>
            <Typography variant='subtitle3'>Earn {mainBalance?.denom}</Typography>
            <Typography color={palette.text.secondary}>Scan your passport</Typography>
          </Stack>

          <IconButton sx={{ background: palette.primary.main, p: 1, ml: 'auto' }}>
            <UiIcon componentName='chevronRight' size={5} />
          </IconButton>
        </Stack>
      </Paper>

      <Paper>
        <Stack spacing={2}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <Typography variant='subtitle3'>History</Typography>
            <UiIcon componentName='chevronRight' />
          </Stack>

          <NoDataView />
        </Stack>
      </Paper>
    </Stack>
  )
}

import { Button, Divider, Paper, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { ErrorView, NoDataView, PageTitles, RarimeAppModal } from '@/common'
import { Icons, RoutePaths } from '@/enums'
import { formatBalance } from '@/helpers'
import { useLoading } from '@/hooks'
import { useWalletState, walletStore } from '@/store'
import { UiIcon } from '@/ui'

import { ReceiveModal, SendModal } from './components'

export default function WalletRoot() {
  const { spacing, palette } = useTheme()

  const { balances } = useWalletState()

  const [isReceiveModalShown, setIsReceiveModalShown] = useState(false)
  const [isSendModalShown, setIsSendModalShown] = useState(false)
  const [isAppModalShown, setIsAppModalShown] = useState(false)

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

  return (
    <Stack spacing={4}>
      <PageTitles title='Wallet' mb={4} />

      {isLoading ? (
        <>
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
        </>
      ) : isLoadingError ? (
        <Paper>
          <ErrorView title='Error loading wallet' />
        </Paper>
      ) : (
        <>
          <Paper>
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
                    startIcon={<UiIcon name={Icons.ArrowDown} />}
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
                    startIcon={<UiIcon name={Icons.ArrowDown} />}
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
                  component={NavLink}
                  to={RoutePaths.WalletAnalytics}
                  startIcon={<UiIcon name={Icons.ChartLine} size={4} />}
                  color='secondary'
                  variant='text'
                >
                  Wallet Analytics
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

              <Button
                color='primary'
                sx={{ p: 1, ml: 'auto', minWidth: 'auto', height: 'auto' }}
                onClick={() => setIsAppModalShown(true)}
              >
                <UiIcon name={Icons.CaretRight} size={5} />
              </Button>

              <RarimeAppModal open={isAppModalShown} onClose={() => setIsAppModalShown(false)} />
            </Stack>
          </Paper>

          <Paper>
            <Stack spacing={2}>
              <Stack direction='row' alignItems='center' spacing={1}>
                <Typography variant='subtitle3'>History</Typography>
                <UiIcon name={Icons.CaretRight} />
              </Stack>

              <NoDataView />
            </Stack>
          </Paper>
        </>
      )}
    </Stack>
  )
}

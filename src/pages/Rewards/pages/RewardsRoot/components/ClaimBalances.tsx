import { Divider, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { formatBalance, formatNumber } from '@/helpers'
import { useLoading } from '@/hooks'
import { useRewardsState, useWalletState, walletStore } from '@/store'

export default function ClaimBalances() {
  const { palette, spacing } = useTheme()
  const { balance } = useRewardsState()
  const { balances: walletBalances } = useWalletState()

  const mainBalance = useMemo(() => walletBalances?.[0], [walletBalances])

  useLoading(undefined, async () => {
    await walletStore.connect()
    await walletStore.loadBalances()
  })

  const balances = [
    {
      label: 'From',
      title: 'Reserved',
      value: `${formatNumber(balance?.amount ?? 0)} RMO`,
    },
    {
      label: 'To',
      title: 'Balance',
      value: mainBalance
        ? `${formatBalance(mainBalance.amount, mainBalance.decimals)} ${mainBalance.denom}`
        : '...',
    },
  ]

  return (
    <Stack spacing={4} p={4} bgcolor={palette.action.active} borderRadius={2}>
      {balances.map((balance, index) => (
        <Stack key={index} spacing={4}>
          <Stack direction='row' justifyContent='space-between'>
            <Stack direction='row' spacing={4} alignItems='center'>
              <Typography variant='buttonMedium' color={palette.text.secondary} width={spacing(10)}>
                {balance.label}
              </Typography>
              <Divider orientation='vertical' flexItem />
              <Typography variant='body3'>{balance.title}</Typography>
            </Stack>
            <Typography variant='subtitle5'>{balance.value}</Typography>
          </Stack>
          {index !== balances.length - 1 && <Divider sx={{ width: spacing(63), mx: 'auto' }} />}
        </Stack>
      ))}
    </Stack>
  )
}

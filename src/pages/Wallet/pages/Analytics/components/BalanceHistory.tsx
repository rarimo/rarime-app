import { Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'

import { formatBalance, formatNumber } from '@/helpers'
import { useWalletState } from '@/store'

import { HistoryDurations } from '../enums/durations'
import BalanceChart from './BalanceChart'

export default function BalanceHistory() {
  const { palette } = useTheme()
  const { balances } = useWalletState()
  const [activeDuration, setActiveDuration] = useState(HistoryDurations.Week)

  const mainBalance = useMemo(() => balances?.[0], [balances])

  const durationOptions = [
    {
      text: '7D',
      value: HistoryDurations.Week,
    },
    {
      text: '1M',
      value: HistoryDurations.Month,
    },
    {
      text: '3M',
      value: HistoryDurations.ThreeMonths,
    },
    {
      text: 'ALL',
      value: HistoryDurations.All,
    },
  ]

  return (
    <Paper component={Stack} spacing={6}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack spacing={2}>
          <Typography variant='body3' color={palette.text.secondary}>
            Total RMO
          </Typography>
          <Typography variant='h4'>
            {formatBalance(mainBalance?.amount, mainBalance?.decimals)}
          </Typography>
          {/* TODO: replace with real data */}
          <Typography variant='caption2' color={palette.text.secondary}>
            ≈ ${formatNumber(4506.4)}{' '}
            <Typography variant='caption2' color={palette.success.dark}>
              (+${formatNumber(345)} today)
            </Typography>
          </Typography>
        </Stack>

        <Stack direction='row' spacing={1} alignItems='center'>
          {durationOptions.map(option => (
            <Button
              key={option.value}
              color='secondary'
              size='medium'
              sx={{
                bgcolor: activeDuration === option.value ? undefined : 'transparent',
                color:
                  activeDuration === option.value ? palette.text.primary : palette.text.secondary,
              }}
              onClick={() => setActiveDuration(option.value)}
            >
              {option.text}
            </Button>
          ))}
        </Stack>
      </Stack>

      <BalanceChart duration={activeDuration} />
    </Paper>
  )
}

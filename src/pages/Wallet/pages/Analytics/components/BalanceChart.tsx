import { time } from '@distributedlab/tools'
import { CircularProgress, Stack, useTheme } from '@mui/material'

import { LineChart, NoDataView } from '@/common'
import { formatDateDM, formatNumber, sleep } from '@/helpers'
import { useLoading } from '@/hooks'

import { HistoryDurations } from '../enums/durations'

// TODO: Replace with real data
async function getChartData(duration: HistoryDurations) {
  await sleep(1000)

  function random(min: number, max: number) {
    return Math.random() * (max - min + 1) + min
  }

  switch (duration) {
    case HistoryDurations.Week:
      return Array.from({ length: 7 }, (_, i) => ({
        label: time()
          .subtract(6 - i, 'days')
          .format('YYYY-MM-DD'),
        value: random(100 * i, 200 * i),
      }))
    case HistoryDurations.Month:
      return Array.from({ length: 30 }, (_, i) => ({
        label: time()
          .subtract(29 - i, 'days')
          .format('YYYY-MM-DD'),
        value: random(100 * i, 200 * i),
      }))
    case HistoryDurations.ThreeMonths:
      return Array.from({ length: 90 }, (_, i) => ({
        label: time()
          .subtract(89 - i, 'days')
          .format('YYYY-MM-DD'),
        value: random(100 * i, 180 * i),
      }))
    case HistoryDurations.All:
      return Array.from({ length: 100 }, (_, i) => ({
        label: time()
          .subtract(99 - i, 'days')
          .format('YYYY-MM-DD'),
        value: random(100 * i, 150 * i),
      }))
  }
}

interface Props {
  duration: HistoryDurations
}

export default function BalanceChart({ duration }: Props) {
  const { spacing } = useTheme()
  const { isLoading, data } = useLoading([], () => getChartData(duration), {
    loadOnMount: true,
    loadArgs: [duration],
  })

  return isLoading ? (
    <Stack height={spacing(90)} justifyContent='center' alignItems='center'>
      <CircularProgress color='secondary' />
    </Stack>
  ) : data.length ? (
    <LineChart
      data={data}
      height={spacing(90)}
      labelFormatter={formatDateDM}
      valueFormatter={value => `${formatNumber(value)} (RMO)`}
    />
  ) : (
    <NoDataView title='No analytics for this period' height={spacing(90)} />
  )
}

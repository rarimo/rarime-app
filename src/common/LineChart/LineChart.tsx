import { Box, useTheme } from '@mui/material'
import { ChartsClipPath } from '@mui/x-charts'
import { type ChartsTextStyle } from '@mui/x-charts/ChartsText'
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis'
import { AreaPlot, LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart'
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer'
import { useCallback, useId, useMemo } from 'react'

import { bottomAppearAnimation, fadeInAnimation } from '@/theme/constants'
import { typography } from '@/theme/typography'

import ChartGradient from './ChartGradient'
import ChartHighlightElement from './ChartHighlightElement'

interface Props {
  data: { label: string; value: number }[]
  height: number | string
  valueFormatter?: (value: number) => string
  labelFormatter?: (label: string) => string
}

export default function LineChart({
  data,
  height,
  valueFormatter = value => value.toString(),
  labelFormatter = label => label,
}: Props) {
  const { palette } = useTheme()

  const xAxisId = useId()
  const bgGradientId = useId()
  const clipPathId = useId()

  const labels = useMemo(() => data.map(({ label }) => label), [data])
  const values = useMemo(() => data.map(({ value }) => value), [data])
  const minValue = useMemo(() => Math.min(...values), [values])

  const getTickLabelInterval = useCallback(
    (index: number) => {
      const MAX_TICKS = 10
      const step = Math.ceil(labels.length / MAX_TICKS)
      return index % step === 0
    },
    [labels],
  )

  return (
    <Box height={height}>
      <ResponsiveChartContainer
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        series={[
          {
            type: 'line',
            data: values,
            area: true,
            color: palette.primary.darker,
            curve: 'linear',
            valueFormatter,
          },
        ]}
        xAxis={[
          {
            id: xAxisId,
            data: labels,
            hideTooltip: true,
            scaleType: 'point',
            valueFormatter: labelFormatter,
          },
        ]}
        yAxis={[{ min: 0.8 * minValue }]}
        sx={{
          '& .MuiAreaElement-root': {
            fill: `url(#${bgGradientId})`,
            animation: `${fadeInAnimation} 300ms ease-out`,
          },
          '& .MuiLineElement-root': {
            animation: `${bottomAppearAnimation} 300ms ease-out`,
          },
        }}
      >
        <defs>
          <ChartGradient
            id={bgGradientId}
            stops={[
              { stopColor: palette.primary.dark, stopOpacity: 0.1 },
              { stopColor: palette.primary.dark, stopOpacity: 0 },
            ]}
          />
        </defs>
        <g clipPath={`url(#${clipPathId})`}>
          <LinePlot />
          <AreaPlot />
        </g>
        <LineHighlightPlot slots={{ lineHighlight: ChartHighlightElement }} />
        <ChartsXAxis
          axisId={xAxisId}
          disableLine
          disableTicks
          tickLabelInterval={(_, index) => getTickLabelInterval(index)}
          tickLabelStyle={{
            ...(typography.buttonSmall as ChartsTextStyle),
            fill: palette.text.placeholder,
          }}
        />
        <ChartsClipPath id={clipPathId} />
      </ResponsiveChartContainer>
    </Box>
  )
}

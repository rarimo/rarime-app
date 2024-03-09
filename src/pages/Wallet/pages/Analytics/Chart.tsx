import { time } from '@distributedlab/tools'
import { Box, useTheme } from '@mui/material'
import { ChartsClipPath } from '@mui/x-charts'
import { type ChartsTextStyle } from '@mui/x-charts/ChartsText'
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip'
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis'
import { useDrawingArea, useYScale } from '@mui/x-charts/hooks'
import {
  AreaPlot,
  LineHighlightElement,
  LineHighlightElementProps,
  LineHighlightPlot,
  LinePlot,
} from '@mui/x-charts/LineChart'
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer'
import { memo, useEffect, useState } from 'react'

import { typography } from '@/theme/typography'

const pData = [120.12, 136.63, 130.12, 140.63, 154.12, 150.63, 160.12]
const xLabels = [
  new Date('2024-01-01'),
  new Date('2024-01-02'),
  new Date('2024-01-03'),
  new Date('2024-01-04'),
  new Date('2024-01-05'),
  new Date('2024-01-06'),
  new Date('2024-01-07'),
]

export default function Chart() {
  const { palette } = useTheme()

  return (
    <Box height={400}>
      <ResponsiveChartContainer
        margin={{ top: 0, right: 20, bottom: 20, left: 20 }}
        series={[
          {
            type: 'line',
            data: pData,
            area: true,
            showMark: false,
            color: palette.primary.darker,
            curve: 'linear',
            valueFormatter: value => `${value} (RMO)`,
          },
        ]}
        xAxis={[
          {
            id: 'x-axis-id',
            data: xLabels,
            hideTooltip: true,
            scaleType: 'point',
            valueFormatter: date => time(date).format('D MMM'),
          },
        ]}
        yAxis={[{ min: Math.min(...pData) * 0.8 }]}
        sx={{
          '& .MuiAreaElement-root': {
            fill: "url('#bgGradient')",
          },
          '@keyframes fade-in': {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
          '@keyframes from-bottom': {
            from: { transform: 'translateY(80%)', opacity: 0 },
            to: { transform: 'translateY(0)', opacity: 1 },
          },
        }}
      >
        <BgGradient />
        <g clipPath={`url(#chart-clip-path)`}>
          <LinePlot style={{ animation: 'from-bottom 300ms ease-in-out' }} />
          <AreaPlot
            y1={0}
            y2={0}
            x1={0}
            x2={0}
            g2={0}
            style={{ animation: 'fade-in 300ms ease-in-out' }}
          />
        </g>
        <LineHighlightPlot slots={{ lineHighlight: Highlighter }} />
        <ChartsXAxis
          position='bottom'
          axisId='x-axis-id'
          disableLine
          disableTicks
          tickLabelStyle={{
            ...(typography.buttonSmall as ChartsTextStyle),
            fill: palette.text.placeholder,
          }}
        />
        <ChartsClipPath id='chart-clip-path' />
      </ResponsiveChartContainer>
    </Box>
  )
}

function BgGradient() {
  const { top, height, bottom } = useDrawingArea()
  const scale = useYScale()
  const svgHeight = top + bottom + height

  return (
    <defs>
      <linearGradient
        id='bgGradient'
        x1='0'
        x2='0'
        y1='0'
        y2={`${svgHeight}px`}
        gradientUnits='userSpaceOnUse'
      >
        <stop offset={0} stopColor='#ACD53E' stopOpacity='0.1' />
        <stop offset={(scale(1) ?? 0) / svgHeight} stopColor='#ACD53E' stopOpacity='0' />
      </linearGradient>
    </defs>
  )
}

const Highlighter = memo((props: LineHighlightElementProps) => {
  const ANCHOR_CLASS_NAME = 'line-highlight-root'

  const { palette } = useTheme()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  useEffect(() => {
    if (!anchorEl) {
      setAnchorEl(document.getElementsByClassName(ANCHOR_CLASS_NAME)[0])
    }
  }, [anchorEl])

  return (
    <>
      <LineHighlightElement
        classes={{ root: ANCHOR_CLASS_NAME }}
        strokeWidth={2}
        stroke={palette.primary.darker}
        style={{ fill: palette.background.paper }}
        {...props}
      />
      <ChartsTooltip
        slotProps={{
          popper: {
            placement: props.x < 50 ? 'top-start' : 'top-end',
            anchorEl,
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [props.x < 50 ? 10 : -10, -18],
                },
              },
            ],
          },
        }}
      />
    </>
  )
})

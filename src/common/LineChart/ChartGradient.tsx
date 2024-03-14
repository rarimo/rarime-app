import { useDrawingArea, useYScale } from '@mui/x-charts/hooks'
import { SVGProps, useMemo } from 'react'

interface Props {
  id: string
  stops: [SVGProps<SVGStopElement>, SVGProps<SVGStopElement>]
}

export default function ChartGradient({ id, stops }: Props) {
  const { top, height, bottom } = useDrawingArea()
  const scale = useYScale()

  const gradientHeight = useMemo(() => top + bottom + height, [top, bottom, height])
  const endOffset = useMemo(() => (scale(1) ?? 0) / gradientHeight, [scale, gradientHeight])

  return (
    <linearGradient
      id={id}
      x1='0'
      x2='0'
      y1='0'
      y2={`${gradientHeight}px`}
      gradientUnits='userSpaceOnUse'
    >
      <stop offset={0} {...stops[0]} />
      <stop offset={endOffset} {...stops[1]} />
    </linearGradient>
  )
}

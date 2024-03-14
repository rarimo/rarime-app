import { useTheme } from '@mui/material'
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip'
import { LineHighlightElement, LineHighlightElementProps } from '@mui/x-charts/LineChart'
import { memo, useEffect, useId, useMemo, useState } from 'react'

function ChartHighlightElement(props: LineHighlightElementProps) {
  const anchorId = useId()
  const { palette } = useTheme()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const anchorClassName = useMemo(() => `line-highlight-root-${anchorId}`, [anchorId])
  const isNearLeftSide = useMemo(() => props.x < 100, [props.x])

  useEffect(() => {
    if (!anchorEl) {
      // Cannot assign ID to the LineHighlightElement, so we need to find it by class name
      setAnchorEl(document.getElementsByClassName(anchorClassName)[0])
    }
  }, [anchorClassName, anchorEl])

  return (
    <>
      <LineHighlightElement
        classes={{ root: anchorClassName }}
        strokeWidth={2}
        stroke={palette.primary.darker}
        style={{ fill: palette.background.paper }}
        {...props}
      />
      <ChartsTooltip
        slotProps={{
          popper: {
            placement: isNearLeftSide ? 'top-start' : 'top-end',
            anchorEl,
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [isNearLeftSide ? 10 : -10, -18],
                },
              },
            ],
          },
        }}
      />
    </>
  )
}

export default memo(ChartHighlightElement)

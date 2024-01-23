import { Tooltip, type TooltipProps } from '@mui/material'

interface Props extends TooltipProps {}

export default function UiTooltip({ ...rest }: Props) {
  return <Tooltip {...rest} />
}

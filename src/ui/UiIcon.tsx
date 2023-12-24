import { Box, SvgIconProps, SxProps } from '@mui/material'
import { HTMLAttributes } from 'react'

import { Icons, ICONS_COMPONENTS } from '@/enums'

type Props = {
  sx?: SxProps
} & (
  | ({
      componentName: keyof typeof ICONS_COMPONENTS
      name?: never
    } & SvgIconProps)
  | ({
      name: Icons
      componentName?: never
    } & HTMLAttributes<HTMLOrSVGElement>)
)

export default function UiIcon(props: Props) {
  if (props.componentName) {
    const { componentName, ...rest } = props

    const IconComponent = ICONS_COMPONENTS[componentName]

    return <IconComponent {...rest} />
  }

  const { sx, className, name, ...rest } = props

  return (
    <Box {...rest} component='svg' sx={sx} className={`icon ${className}`} aria-hidden='true'>
      <use href={`#${name}-icon`} {...rest} />
    </Box>
  )
}
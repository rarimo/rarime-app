import { Box, SvgIconProps, SxProps } from '@mui/material'
import { HTMLAttributes } from 'react'

import { ICON_COMPONENTS, Icons } from '@/enums'

type Props = {
  sx?: SxProps
} & (
  | ({
      componentName: keyof typeof ICON_COMPONENTS
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

    const IconComponent = ICON_COMPONENTS[componentName]

    return IconComponent && <IconComponent {...rest} />
  }

  const { sx, className, name, ...rest } = props

  return (
    <Box
      {...rest}
      component='svg'
      sx={sx}
      className={['icon', ...(className ? [className] : [])].join(' ')}
      aria-hidden='true'
    >
      <use href={`#${name}-icon`} {...rest} />
    </Box>
  )
}

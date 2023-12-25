import { Box, SvgIconProps, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { HTMLAttributes } from 'react'

import { ICON_COMPONENTS, Icons } from '@/enums'

type Props = {
  size?: number
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

export default function UiIcon({ size = 6, ...props }: Props) {
  const wrappedSx: SxProps<Theme> = {
    ...props.sx,
    width: theme => theme.spacing(size),
    height: theme => theme.spacing(size),
  }

  if (props.componentName) {
    const { componentName, ...rest } = props

    const IconComponent = ICON_COMPONENTS[componentName]

    return IconComponent && <IconComponent {...rest} sx={wrappedSx} />
  }

  const { className, name, ...rest } = props

  return (
    <Box
      {...rest}
      component='svg'
      sx={wrappedSx}
      className={['icon', ...(className ? [className] : [])].join(' ')}
      aria-hidden='true'
    >
      <use href={`#${name}-icon`} {...rest} />
    </Box>
  )
}

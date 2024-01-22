import { Box, BoxProps, SvgIconProps, SxProps } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { forwardRef } from 'react'

import { ICON_COMPONENTS, Icons } from '@/enums'

type Props = {
  size?: number
  sx?: SxProps<Theme>
} & (
  | ({
      componentName: keyof typeof ICON_COMPONENTS
      name?: never
    } & SvgIconProps)
  | ({
      name: Icons
      componentName?: never
    } & BoxProps<'svg'>)
)

const UiIcon = forwardRef<SVGSVGElement, Props>(({ size = 6, ...props }, ref) => {
  const sx: SxProps<Theme> = {
    ...props.sx,
    width: theme => theme.spacing(size),
    height: theme => theme.spacing(size),
    minWidth: theme => theme.spacing(size),
    minHeight: theme => theme.spacing(size),
    maxWidth: theme => theme.spacing(size),
    maxHeight: theme => theme.spacing(size),
  }

  if (props.componentName) {
    const { componentName, ...rest } = props

    const IconComponent = ICON_COMPONENTS[componentName]
    return IconComponent && <IconComponent {...rest} ref={ref} sx={sx} />
  }

  const { className, name, ...rest } = props

  return (
    <Box
      {...rest}
      ref={ref}
      component='svg'
      sx={sx}
      className={['icon', ...(className ? [className] : [])].join(' ')}
      aria-hidden='true'
    >
      <use href={`#${name}-icon`} />
    </Box>
  )
})

export default UiIcon

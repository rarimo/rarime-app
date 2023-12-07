import { Box, SxProps } from '@mui/material'
import { HTMLAttributes } from 'react'

import { Icons } from '@/enums'

export default function Icon({
  name,
  className = '',
  sx = {},
  ...rest
}: {
  sx: SxProps
  name: Icons
} & HTMLAttributes<HTMLOrSVGElement>) {
  return (
    <Box {...rest} component='svg' sx={sx} className={`icon ${className}`} aria-hidden='true'>
      <use href={`#${name}-icon`} {...rest} />
    </Box>
  )
}

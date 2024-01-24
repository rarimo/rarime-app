import {
  Box,
  DialogTitle,
  Drawer,
  type DrawerProps,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import { ReactNode } from 'react'

import UiIcon from './UiIcon'
import UiIconButton from './UiIconButton'

interface Props extends DrawerProps {
  header: ReactNode
  actions?: ReactNode
}

export default function UiDrawer({ header, actions, children, ...rest }: Props) {
  const { palette } = useTheme()

  return (
    <Drawer {...rest}>
      <DialogTitle
        component={Stack}
        direction={'row'}
        justifyContent={'space-between'}
        width={'100%'}
        p={5}
        borderBottom={1}
        borderColor={palette.divider}
      >
        <Typography component={'p'} variant='h6'>
          {header}
        </Typography>
        <UiIconButton
          aria-label='close'
          onClick={e => rest.onClose?.(e, 'backdropClick')}
          sx={{ color: palette.text.secondary }}
        >
          <UiIcon componentName='close' size={5} />
        </UiIconButton>
      </DialogTitle>
      <Box p={5} flex={1}>
        {children}
      </Box>
      <Box px={5} py={4} borderTop={1} borderColor={palette.divider}>
        {actions}
      </Box>
    </Drawer>
  )
}

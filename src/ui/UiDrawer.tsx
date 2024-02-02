import {
  Box,
  type BoxProps,
  DialogTitle,
  Drawer,
  type DrawerProps,
  ModalProps,
  Stack,
  type StackProps,
  Typography,
  useTheme,
} from '@mui/material'

import UiIcon from './UiIcon'
import UiIconButton from './UiIconButton'

interface UiDrawerTitleProps extends StackProps {
  onClose?: ModalProps['onClose']
}

export function UiDrawerTitle({ children, onClose, ...rest }: UiDrawerTitleProps) {
  const { palette } = useTheme()

  return (
    <DialogTitle
      component={Stack}
      direction={'row'}
      justifyContent={'space-between'}
      width={'100%'}
      p={5}
      borderBottom={1}
      borderColor={palette.divider}
      {...rest}
    >
      <Typography component={'p'} variant='h6'>
        {children}
      </Typography>
      <UiIconButton
        aria-label='close'
        onClick={e => onClose?.(e, 'backdropClick')}
        sx={{ color: palette.text.secondary }}
      >
        <UiIcon componentName='close' size={5} />
      </UiIconButton>
    </DialogTitle>
  )
}

export function UiDrawerContent(props: BoxProps) {
  return <Box p={5} flex={1} overflow={'hidden auto'} width={'100%'} {...props} />
}

export function UiDrawerActions(props: BoxProps) {
  return (
    <Box px={5} py={4} borderTop={1} borderColor={theme => theme.palette.divider} {...props}></Box>
  )
}

export default function UiDrawer(props: DrawerProps) {
  return <Drawer {...props} />
}

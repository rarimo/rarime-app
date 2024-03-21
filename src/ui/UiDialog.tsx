import {
  Box,
  type BoxProps,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  type StackProps,
  Typography,
  useTheme,
} from '@mui/material'

import { Icons } from '@/enums'

import UiIcon from './UiIcon'

interface UiDialogTitleProps extends StackProps {
  onClose?: DialogProps['onClose']
}

export function UiDialogTitle({ children, onClose, ...rest }: UiDialogTitleProps) {
  const { palette } = useTheme()

  return (
    <DialogTitle
      {...rest}
      component={Stack}
      direction='row'
      justifyContent='space-between'
      width='100%'
      borderBottom={1}
      borderColor={palette.divider}
      sx={{ ...rest.sx, p: 5 }}
    >
      <Typography component='p' variant='h6'>
        {children}
      </Typography>
      <IconButton color='secondary' aria-label='close' onClick={e => onClose?.(e, 'backdropClick')}>
        <UiIcon name={Icons.Close} size={5} />
      </IconButton>
    </DialogTitle>
  )
}

export function UiDialogContent(props: BoxProps) {
  return <Box p={5} flex={1} overflow='hidden auto' width='100%' {...props} />
}

export function UiDialogActions(props: BoxProps) {
  return (
    <Box px={5} py={4} borderTop={1} borderColor={theme => theme.palette.divider} {...props}></Box>
  )
}

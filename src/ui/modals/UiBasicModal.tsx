import { Box, BoxProps } from '@mui/material'
import { ComponentProps } from 'react'

import UiModal from '@/ui/UiModal'

interface Props extends BoxProps {
  open: boolean
  onClose: () => void
  modalProps?: ComponentProps<typeof UiModal>
}

export default function UiBasicModal({ open, onClose, children, modalProps, ...rest }: Props) {
  return (
    <UiModal {...modalProps} open={open} onClose={onClose}>
      <Box
        {...rest}
        sx={theme => ({
          overflow: 'hidden',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: theme.palette.background.default,
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(4),
        })}
      >
        {children}
      </Box>
    </UiModal>
  )
}

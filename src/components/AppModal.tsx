import { Box, Modal } from '@mui/material'
import { SxProps } from '@mui/system'
import React from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactElement
  style?: SxProps
}

const defaultStyle: SxProps = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  bgcolor: 'var(--col-light)',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
}

const AppModal = ({ isOpen, onClose, children, style = defaultStyle }: Props) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  )
}

export default AppModal

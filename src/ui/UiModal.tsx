import { Modal, ModalProps } from '@mui/material'

interface Props extends ModalProps {}

export default function UiModal({ children, ...rest }: Props) {
  return <Modal {...rest}>{children}</Modal>
}

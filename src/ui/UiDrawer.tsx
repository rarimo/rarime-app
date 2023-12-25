import { Drawer, type DrawerProps } from '@mui/material'

interface Props extends DrawerProps {}

export default function UiDrawer({ children, ...rest }: Props) {
  return <Drawer {...rest}>{children}</Drawer>
}

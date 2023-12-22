import { Drawer, type DrawerProps } from '@mui/material'

interface Props extends DrawerProps {}

export default function UiDrawer({ ...rest }: Props) {
  return <Drawer {...rest} />
}

import { Drawer, type DrawerProps } from '@mui/material'

interface Props extends DrawerProps {}

const AppDrawer = ({ ...rest }: Props) => {
  return <Drawer {...rest} />
}

export default AppDrawer

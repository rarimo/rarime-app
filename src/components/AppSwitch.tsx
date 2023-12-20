import { Switch, type SwitchProps } from '@mui/material'

interface Props extends SwitchProps {}

const AppSwitch = ({ ...rest }: Props) => {
  return <Switch {...rest} />
}

export default AppSwitch

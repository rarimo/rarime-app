import { Switch, type SwitchProps } from '@mui/material'

interface Props extends SwitchProps {}

export default function UiSwitchField({ ...rest }: Props) {
  return <Switch {...rest} />
}

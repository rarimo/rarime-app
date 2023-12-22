import { FormControlLabel, Switch, type SwitchProps } from '@mui/material'

interface Props extends SwitchProps {
  label?: string
}

export default function UiSwitchField({ label, ...rest }: Props) {
  return label ? (
    <FormControlLabel control={<Switch {...rest} />} label='Label' />
  ) : (
    <Switch {...rest} />
  )
}

import { FormControlLabel, Switch, type SwitchProps } from '@mui/material'
import { forwardRef } from 'react'

interface Props extends SwitchProps {
  label?: string
}

const UiSwitch = forwardRef(({ label, ...rest }: Props, ref) => {
  return label ? (
    <FormControlLabel inputRef={ref} control={<Switch {...rest} />} label={label} />
  ) : (
    <Switch {...rest} inputRef={ref} />
  )
})

export default UiSwitch

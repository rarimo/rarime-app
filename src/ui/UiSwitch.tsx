import { FormControlLabel, Switch, type SwitchProps } from '@mui/material'
import { ReactNode } from 'react'

interface Props extends SwitchProps {
  label?: ReactNode
}

export default function UiSwitch({ label, ref, ...rest }: Props) {
  return label ? (
    <FormControlLabel
      inputRef={ref}
      control={<Switch {...rest} />}
      label={label}
      sx={{ gap: 4, mx: 0 }}
    />
  ) : (
    <Switch ref={ref} {...rest} />
  )
}

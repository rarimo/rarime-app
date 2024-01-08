import { FormControlLabel, Switch, type SwitchProps } from '@mui/material'
import { forwardRef } from 'react'

interface Props extends SwitchProps {
  label?: string
}

const UiSwitch = forwardRef(({ label, ...rest }: Props, ref) => {
  return label ? (
    <FormControlLabel
      inputRef={ref}
      control={<Switch {...rest} />}
      label={label}
      sx={{
        border: '1px solid',
        borderColor: theme => theme.palette.grey.A200,
        borderRadius: '100px',
        pr: 4,
      }}
    />
  ) : (
    <Switch {...rest} inputRef={ref} />
  )
})

export default UiSwitch

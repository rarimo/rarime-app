import { Checkbox, type CheckboxProps, FormControlLabel } from '@mui/material'

interface Props extends CheckboxProps {
  label?: string
}

export default function UiCheckbox({ label, ...rest }: Props) {
  return label ? (
    <FormControlLabel control={<Checkbox {...rest} />} label={label} />
  ) : (
    <Checkbox {...rest} />
  )
}

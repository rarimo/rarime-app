import { Checkbox, type CheckboxProps } from '@mui/material'

interface Props extends CheckboxProps {}

export default function UiCheckbox({ ...rest }: Props) {
  return <Checkbox {...rest} />
}

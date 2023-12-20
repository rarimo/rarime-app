import { Checkbox, type CheckboxProps } from '@mui/material'

interface Props extends CheckboxProps {}

const AppCheckbox = ({ ...rest }: Props) => {
  return <Checkbox {...rest} />
}

export default AppCheckbox

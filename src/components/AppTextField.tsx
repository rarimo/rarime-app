import { TextField, type TextFieldProps } from '@mui/material'

type Props = TextFieldProps

const AppTextField = ({ ...rest }: Props) => {
  return <TextField {...rest} />
}

export default AppTextField

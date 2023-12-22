import { TextField, type TextFieldProps } from '@mui/material'

type Props = TextFieldProps

export default function UiTextField({ ...rest }: Props) {
  return <TextField {...rest} />
}

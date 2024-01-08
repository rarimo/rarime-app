import { TextField, type TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'

type Props = TextFieldProps & {
  errorMessage?: string
}

const UiTextField = forwardRef(({ errorMessage, ...rest }: Props, ref) => {
  return (
    <TextField
      {...rest}
      inputRef={ref}
      error={!!errorMessage}
      helperText={errorMessage || rest.helperText}
    />
  )
})

export default UiTextField

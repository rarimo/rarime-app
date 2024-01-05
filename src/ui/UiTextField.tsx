import { TextField, type TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'

type Props = TextFieldProps & {
  errorMessage?: string
  borderRadius?: string
}

const UiTextField = forwardRef(({ errorMessage, borderRadius = '1000px', ...rest }: Props, ref) => {
  return (
    <TextField
      {...rest}
      inputRef={ref}
      error={!!errorMessage}
      helperText={errorMessage || rest.helperText}
      sx={{
        '& fieldset': {
          borderRadius: borderRadius,
        },
      }}
    />
  )
})

export default UiTextField

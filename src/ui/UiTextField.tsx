import { FormLabel, Stack, TextField, type TextFieldProps } from '@mui/material'
import { useId } from 'react'

type Props = TextFieldProps & {
  errorMessage?: string
}

export default function UiTextField({ errorMessage, label, ref, ...rest }: Props) {
  const fieldId = useId()

  return (
    <Stack spacing={2}>
      {label && <FormLabel htmlFor={fieldId}>{label}</FormLabel>}
      <TextField
        {...rest}
        id={fieldId}
        inputRef={ref}
        error={!!errorMessage}
        helperText={errorMessage || rest.helperText}
      />
    </Stack>
  )
}

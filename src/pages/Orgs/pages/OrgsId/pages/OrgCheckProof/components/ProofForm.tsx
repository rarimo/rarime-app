import { InputAdornment, Stack, useTheme } from '@mui/material'

import { UiIcon, UiTextField } from '@/ui'

export default function ProofForm() {
  const { palette } = useTheme()

  return (
    <Stack spacing={8}>
      <UiTextField
        placeholder={'Enter the proof link here'}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <UiIcon componentName='search' sx={{ color: palette.text.secondary }} />
            </InputAdornment>
          ),
        }}
      />
      <UiTextField
        label={'Checking Telegram'}
        placeholder={"Enter the Telegram Handle of the Person You're Verifying"}
      />
      <UiTextField label={'Checking Age'} placeholder={'Over +18'} />
    </Stack>
  )
}

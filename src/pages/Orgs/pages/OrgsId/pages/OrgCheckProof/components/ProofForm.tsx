import { InputAdornment, Stack, useTheme } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { UiButton, UiIcon, UiTextField } from '@/ui'

import ProofViewer from './ProofViewer'

export default function ProofForm() {
  const { palette } = useTheme()
  const [params] = useSearchParams()

  return (
    <Stack spacing={8}>
      <UiTextField
        value={params.get('proof') || ''}
        placeholder={'Enter the proof link here'}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <UiIcon componentName='search' sx={{ color: palette.text.secondary }} />
            </InputAdornment>
          ),
        }}
      />

      <Stack spacing={2}>
        <UiTextField
          label={'Checking Telegram'}
          placeholder={"Enter the Telegram Handle of the Person You're Verifying"}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <UiButton variant='text' color='primary'>
                  Check
                </UiButton>
              </InputAdornment>
            ),
          }}
        />
        <ProofViewer />
      </Stack>
    </Stack>
  )
}

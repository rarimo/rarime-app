import { InputAdornment, Stack, useTheme } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'

import { sleep } from '@/helpers'
import { useLoading } from '@/hooks'
import { UiButton, UiTextField } from '@/ui'

import { CredentialTypes } from './ProofForm'
import ProofViewer from './ProofViewer'

interface Props {
  type: CredentialTypes
}

export default function CredentialField({ type }: Props) {
  const [value, setValue] = useState<string | undefined>('')

  const checkProof = useCallback(async () => {
    await sleep(1000)
    return value !== ''
  }, [value])

  const {
    data: isValid,
    isLoading,
    reload,
    reset,
  } = useLoading<boolean | undefined>(undefined, checkProof, {
    loadOnMount: false,
  })

  const label = useMemo(() => {
    return (
      {
        [CredentialTypes.FirstName]: 'First Name',
        [CredentialTypes.LastName]: 'Last Name',
        [CredentialTypes.Age]: 'Age',
        [CredentialTypes.Telegram]: 'Telegram',
      }[type] ?? 'Unknown'
    )
  }, [type])

  const placeholder = useMemo(() => {
    return (
      {
        [CredentialTypes.FirstName]: 'Enter the First Name',
        [CredentialTypes.LastName]: 'Enter the Last Name',
        [CredentialTypes.Age]: 'Enter the Age',
        [CredentialTypes.Telegram]: 'Enter the Telegram Handle',
      }[type] ?? 'Enter the Details'
    )
  }, [type])

  const handleChange = (value: string) => {
    setValue(value)
    reset()
  }

  return (
    <Stack spacing={2} key={type}>
      <UiTextField
        value={value}
        label={label}
        placeholder={placeholder}
        onChange={e => handleChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <UiButton variant='text' color='primary' disabled={isLoading} onClick={reload}>
                {isLoading ? 'Checking...' : 'Check'}
              </UiButton>
            </InputAdornment>
          ),
        }}
      />

      {!isLoading && isValid !== undefined && <ProofViewer isValid={isValid} />}
    </Stack>
  )
}

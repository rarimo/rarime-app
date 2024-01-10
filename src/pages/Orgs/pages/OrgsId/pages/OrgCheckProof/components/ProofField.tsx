import { InputAdornment, Stack } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'

import { Proof } from '@/api'
import { sleep } from '@/helpers'
import { useLoading } from '@/hooks'
import { UiButton, UiTextField } from '@/ui'

import ProofValidationResult from './ProofValidationResult'

// TODO: fill in a proper way and move to constants
enum ProofTypes {
  FirstName = 'firstName',
  LastName = 'lastName',
  Age = 'age',
  Telegram = 'telegram',
}

interface Props {
  proof: Proof
}

export default function ProofField({ proof }: Props) {
  const [value, setValue] = useState<string | undefined>('')

  const checkProof = useCallback(async () => {
    // TODO: implement a proper proof check
    await sleep(1000)
    return value === 'test'
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
        [ProofTypes.FirstName]: 'First Name',
        [ProofTypes.LastName]: 'Last Name',
        [ProofTypes.Age]: 'Age',
        [ProofTypes.Telegram]: 'Telegram',
      }[proof.proof_type] ?? 'Unknown'
    )
  }, [proof.proof_type])

  const placeholder = useMemo(() => {
    return (
      {
        [ProofTypes.FirstName]: 'Enter the First Name',
        [ProofTypes.LastName]: 'Enter the Last Name',
        [ProofTypes.Age]: 'Enter the Age',
        [ProofTypes.Telegram]: 'Enter the Telegram Handle',
      }[proof.proof_type] ?? 'Enter the Details'
    )
  }, [proof.proof_type])

  const handleChange = (value: string) => {
    setValue(value)
    reset()
  }

  return (
    <Stack spacing={2}>
      <UiTextField
        value={value}
        label={label}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <UiButton
                variant='text'
                color='primary'
                disabled={!value || isLoading}
                onClick={reload}
              >
                {isLoading ? 'Checking...' : 'Check'}
              </UiButton>
            </InputAdornment>
          ),
        }}
        onChange={e => handleChange(e.target.value)}
      />

      {!isLoading && isValid !== undefined && (
        <ProofValidationResult proof={proof} isValid={isValid} />
      )}
    </Stack>
  )
}

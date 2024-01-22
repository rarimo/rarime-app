import { InputAdornment, Stack } from '@mui/material'
import startCase from 'lodash/startCase'
import { useCallback, useMemo, useState } from 'react'

import { loadAndParseCredentialSchema, Proof } from '@/api'
import { sleep } from '@/helpers'
import { useLoading } from '@/hooks'
import { UiButton, UiTextField } from '@/ui'

import ProofValidationResult from './ProofValidationResult'

interface Props {
  proof: Proof
}

export default function ProofField({ proof }: Props) {
  const [value, setValue] = useState<string | undefined>('')
  const {
    data: parsedSchema,
    isLoading: isSchemaLoading,
    isLoadingError: isSchemaLoadingError,
    isEmpty: isSchemaEmpty,
  } = useLoading(null, () => loadAndParseCredentialSchema(proof.schema_url), {
    loadOnMount: true,
    loadArgs: [proof.schema_url],
  })

  const formattedFieldKey = useMemo(() => {
    return startCase(parsedSchema?.key ?? '')
  }, [parsedSchema])

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

  const handleChange = (value: string) => {
    setValue(value)
    reset()
  }

  // TODO: Handle states properly
  return isSchemaLoading ? (
    <></>
  ) : isSchemaLoadingError ? (
    <></>
  ) : isSchemaEmpty || !formattedFieldKey ? (
    <></>
  ) : (
    <Stack spacing={2}>
      <UiTextField
        value={value}
        label={formattedFieldKey}
        placeholder={`Enter the ${formattedFieldKey}`}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <UiButton
                variant='text'
                color='secondary'
                size='medium'
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

      {isValid !== undefined && <ProofValidationResult proof={proof} isValid={isValid} />}
    </Stack>
  )
}

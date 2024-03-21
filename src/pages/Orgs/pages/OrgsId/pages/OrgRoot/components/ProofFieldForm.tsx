import { Button, InputAdornment, useTheme } from '@mui/material'
import startCase from 'lodash/startCase'
import { useCallback, useMemo, useState } from 'react'

import { Proof } from '@/api/modules/link'
import { getTargetProperty, loadAndParseCredentialSchema } from '@/api/modules/zkp'
import { sleep } from '@/helpers'
import { useLoading } from '@/hooks'
import { UiTextField } from '@/ui'

import ProofValidationResult from './ProofValidationResult'

interface Props {
  proof: Proof
}

export default function ProofFieldForm({ proof }: Props) {
  const { palette } = useTheme()
  const [value, setValue] = useState<string | undefined>('')

  const {
    data: parsedSchema,
    isLoading: isSchemaLoading,
    isLoadingError: isSchemaLoadingError,
    isEmpty: isSchemaEmpty,
  } = useLoading(
    null,
    async () => getTargetProperty(await loadAndParseCredentialSchema(proof.schema_url)),
    {
      loadOnMount: true,
      loadArgs: [proof.schema_url],
    },
  )

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

  const inputSx = useMemo(() => {
    return isValid !== undefined
      ? {
          '& .MuiOutlinedInput-notchedOutline': {
            borderBottomLeftRadius: '0 !important',
            borderBottomRightRadius: '0 !important',
            borderColor: `${palette.action.hover} !important`,
          },
        }
      : undefined
  }, [isValid, palette.action.hover])

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
    <form
      onSubmit={e => {
        e.preventDefault()
        reload()
      }}
    >
      <UiTextField
        value={value}
        label={formattedFieldKey}
        placeholder={`Enter the ${formattedFieldKey}`}
        InputProps={{
          sx: inputSx,
          endAdornment: (
            <InputAdornment position='end'>
              <Button
                type='submit'
                variant='text'
                color='secondary'
                size='medium'
                disabled={!value || isLoading}
              >
                {isLoading ? 'Veryfying...' : 'Verify'}
              </Button>
            </InputAdornment>
          ),
        }}
        onChange={e => handleChange(e.target.value)}
      />

      {isValid !== undefined && <ProofValidationResult proof={proof} isValid={isValid} />}
    </form>
  )
}

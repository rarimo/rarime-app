import { NotFoundError } from '@distributedlab/jac'
import { Button, CircularProgress, FormControl, Stack, useTheme } from '@mui/material'
import { useCallback } from 'react'
import { Controller } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { rewardsStore } from '@/store'
import { UiTextField } from '@/ui'

enum FieldNames {
  Code = 'code',
}

export default function InvitationForm() {
  const { spacing } = useTheme()
  const [searchParams] = useSearchParams()

  const {
    control,
    isFormDisabled,
    enableForm,
    disableForm,
    getErrorMessage,
    setError,
    handleSubmit,
  } = useForm({ [FieldNames.Code]: searchParams.get('code') || '' }, yup =>
    yup.object().shape({
      [FieldNames.Code]: yup.string().required(),
    }),
  )

  const submit = useCallback(
    async (formData: Record<FieldNames, string>) => {
      disableForm()

      try {
        await rewardsStore.activateBalance(formData[FieldNames.Code])
      } catch (error) {
        if (error instanceof NotFoundError) {
          setError(FieldNames.Code, {
            type: 'custom',
            message: 'Invalid invitation code',
          })
        } else {
          ErrorHandler.process(error)
        }
      }

      enableForm()
    },
    [disableForm, enableForm, setError],
  )

  return (
    <Stack component='form' spacing={4} onSubmit={handleSubmit(submit)}>
      <Controller
        name={FieldNames.Code}
        control={control}
        render={({ field }) => (
          <FormControl>
            <UiTextField
              {...field}
              placeholder='Enter invitation code'
              errorMessage={getErrorMessage(FieldNames.Code)}
              disabled={isFormDisabled}
            />
          </FormControl>
        )}
      />
      <Button
        fullWidth
        type='submit'
        disabled={isFormDisabled}
        startIcon={isFormDisabled && <CircularProgress size={spacing(5)} color='secondary' />}
      >
        {isFormDisabled ? 'Activating...' : 'Activate'}
      </Button>
    </Stack>
  )
}

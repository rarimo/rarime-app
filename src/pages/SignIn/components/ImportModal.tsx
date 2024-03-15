import { FormControl } from '@mui/base'
import { Button, CircularProgress, Dialog, DialogProps, Stack, useTheme } from '@mui/material'
import { useCallback, useEffect, useRef } from 'react'
import { Controller } from 'react-hook-form'

import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { identityStore } from '@/store'
import { UiDialogContent, UiDialogTitle, UiTextField } from '@/ui'

interface Props extends DialogProps {
  onImport?: () => void
}

enum FieldNames {
  PrivateKey = 'privateKey',
}

const DEFAULT_VALUES = {
  [FieldNames.PrivateKey]: '',
}

export default function ImportModal({ onImport, ...rest }: Props) {
  const { spacing } = useTheme()
  const inputRef = useRef<HTMLInputElement>(null)

  const { handleSubmit, control, isFormDisabled, getErrorMessage, disableForm, enableForm } =
    useForm(DEFAULT_VALUES, yup =>
      yup.object().shape({
        [FieldNames.PrivateKey]: yup
          .string()
          .required()
          .test('is-hex', 'Invalid private key', value => {
            return /^[0-9a-fA-F]{64}$/.test(value)
          }),
      }),
    )

  const submit = useCallback(
    async (formData: typeof DEFAULT_VALUES) => {
      disableForm()

      try {
        await identityStore.createIdentity({ privateKeyHex: formData[FieldNames.PrivateKey] })
        onImport?.()
      } catch (error) {
        ErrorHandler.process(error)
      }

      enableForm()
    },
    [disableForm, enableForm, onImport],
  )

  useEffect(() => {
    if (rest.open) {
      // Focus input after the dialog is opened and the form is rendered
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [rest.open])

  return (
    <Dialog
      {...rest}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(submit),
        sx: { width: spacing(110) },
      }}
    >
      <UiDialogTitle onClose={rest.onClose}>Import Identity</UiDialogTitle>
      <UiDialogContent>
        <Stack spacing={6}>
          <Controller
            name={FieldNames.PrivateKey}
            control={control}
            render={({ field }) => (
              <FormControl>
                <UiTextField
                  {...field}
                  ref={inputRef}
                  type='password'
                  label='Enter your private key'
                  errorMessage={getErrorMessage(FieldNames.PrivateKey)}
                  disabled={isFormDisabled}
                  helperText='Your private key will be stored in MetaMask'
                />
              </FormControl>
            )}
          />
          <Button type='submit' disabled={isFormDisabled}>
            Import
          </Button>
        </Stack>
      </UiDialogContent>

      {isFormDisabled && (
        <Stack
          justifyContent='center'
          alignItems='center'
          position='absolute'
          top={0}
          left={0}
          bottom={0}
          right={0}
          bgcolor={theme => theme.palette.background.light}
        >
          <CircularProgress color='inherit' />
        </Stack>
      )}
    </Dialog>
  )
}

import { FormControl, Stack, StackProps } from '@mui/material'
import { HTMLAttributes, useCallback } from 'react'
import { Controller } from 'react-hook-form'

import { createOrg } from '@/api'
import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { UiButton, UiImageUploader, UiTextField } from '@/ui'

interface Props extends StackProps {
  formProps?: HTMLAttributes<HTMLFormElement>
}

enum FormNames {
  Logo = 'LogoUrl',
  Name = 'name',
  Description = 'description',
  Domain = 'domain',
}

const DEFAULT_VALUES = {
  [FormNames.Logo]: null as File | null,
  [FormNames.Name]: '',
  [FormNames.Description]: '',
  [FormNames.Domain]: '',
}

export default function MetadataForm({ formProps, ...rest }: Props) {
  const {
    formState,
    handleSubmit,
    control,
    isFormDisabled,
    getErrorMessage,
    disableForm,
    enableForm,
  } = useForm(DEFAULT_VALUES, yup =>
    yup.object().shape({
      [FormNames.Logo]: yup.mixed().required(),
      [FormNames.Name]: yup.string().required(),
      [FormNames.Description]: yup.string().required(),
      [FormNames.Domain]: yup.string().url().required(),
    }),
  )

  console.log(formState)

  const submit = useCallback(
    async (formData: typeof DEFAULT_VALUES) => {
      if (!formData[FormNames.Logo]) return

      disableForm()

      try {
        // FIXME: load to s3 and get url
        const logoUrl = URL.createObjectURL(formData[FormNames.Logo])

        await createOrg({
          id: 'did:iden3:readonly:blabla',
          ownerDid: 'did:iden3:readonly:blabla',
          domain: formData[FormNames.Domain],
          metadata: {
            logoUrl,
            name: formData[FormNames.Name],
            description: formData[FormNames.Description],
          },
        })
      } catch (error) {
        ErrorHandler.process(error)
      }

      enableForm()
    },
    [disableForm, enableForm],
  )

  return (
    <Stack {...rest}>
      <form {...formProps} onSubmit={handleSubmit(submit)}>
        <Controller
          name={FormNames.Logo}
          control={control}
          render={({ field }) => (
            <FormControl>
              <UiImageUploader
                {...field}
                label={FormNames.Logo}
                // errorMessage={getErrorMessage(FormNames.Logo)}
                disabled={isFormDisabled}
              />
            </FormControl>
          )}
        />

        <Controller
          name={FormNames.Name}
          control={control}
          render={({ field }) => (
            <FormControl>
              <UiTextField
                {...field}
                label={FormNames.Name}
                errorMessage={getErrorMessage(FormNames.Name)}
                disabled={isFormDisabled}
              />
            </FormControl>
          )}
        />

        <Controller
          name={FormNames.Description}
          control={control}
          render={({ field }) => (
            <FormControl>
              <UiTextField
                {...field}
                label={FormNames.Description}
                errorMessage={getErrorMessage(FormNames.Description)}
                disabled={isFormDisabled}
              />
            </FormControl>
          )}
        />

        <Controller
          name={FormNames.Domain}
          control={control}
          render={({ field }) => (
            <FormControl>
              <UiTextField
                {...field}
                label={FormNames.Domain}
                errorMessage={getErrorMessage(FormNames.Domain)}
                disabled={isFormDisabled}
              />
            </FormControl>
          )}
        />

        <UiButton type='submit'>Next</UiButton>
      </form>
    </Stack>
  )
}

import { FormControl, Stack, StackProps } from '@mui/material'
import { HTMLAttributes, useCallback } from 'react'
import { Controller } from 'react-hook-form'

import { createOrg, Organization } from '@/api'
import { ErrorHandler } from '@/helpers'
import { useForm, useMetamaskZkpSnapContext } from '@/hooks'
import { UiButton, UiImageUploader, UiTextField } from '@/ui'

interface Props extends StackProps {
  formProps?: HTMLAttributes<HTMLFormElement>

  onOrgCreated?: (org: Organization) => Promise<void>
}

enum FieldNames {
  Logo = 'logo',
  Name = 'name',
  Description = 'description',
  Domain = 'domain',
}

const DEFAULT_VALUES = {
  [FieldNames.Logo]: null as File | null,
  [FieldNames.Name]: '',
  [FieldNames.Description]: '',
  [FieldNames.Domain]: '',
}

export default function MetadataForm({ formProps, onOrgCreated, ...rest }: Props) {
  const { userDid } = useMetamaskZkpSnapContext()

  const { handleSubmit, control, isFormDisabled, getErrorMessage, disableForm, enableForm } =
    useForm(DEFAULT_VALUES, yup =>
      yup.object().shape({
        [FieldNames.Logo]: yup.mixed().required(),
        [FieldNames.Name]: yup.string().required(),
        [FieldNames.Description]: yup.string().required(),
        [FieldNames.Domain]: yup.string().url().required(),
      }),
    )

  const submit = useCallback(
    async (formData: typeof DEFAULT_VALUES) => {
      if (!formData[FieldNames.Logo]) return

      disableForm()

      try {
        // FIXME: load to s3 and get url
        const logoUrl = URL.createObjectURL(formData[FieldNames.Logo])

        await onOrgCreated?.(
          await createOrg({
            ownerDid: userDid,
            domain: formData[FieldNames.Domain],
            metadata: {
              logoUrl,
              name: formData[FieldNames.Name],
              description: formData[FieldNames.Description],
            },
          }),
        )
      } catch (error) {
        ErrorHandler.process(error)
      }

      enableForm()
    },
    [disableForm, enableForm, onOrgCreated, userDid],
  )

  return (
    <Stack {...rest}>
      <form {...formProps} onSubmit={handleSubmit(submit)}>
        <Controller
          name={FieldNames.Logo}
          control={control}
          render={({ field }) => (
            <FormControl>
              <UiImageUploader
                {...field}
                label={FieldNames.Logo}
                // errorMessage={getErrorMessage(FieldNames.Logo)}
                disabled={isFormDisabled}
              />
            </FormControl>
          )}
        />

        <Controller
          name={FieldNames.Name}
          control={control}
          render={({ field }) => (
            <FormControl>
              <UiTextField
                {...field}
                label={FieldNames.Name}
                errorMessage={getErrorMessage(FieldNames.Name)}
                disabled={isFormDisabled}
              />
            </FormControl>
          )}
        />

        <Controller
          name={FieldNames.Description}
          control={control}
          render={({ field }) => (
            <FormControl>
              <UiTextField
                {...field}
                label={FieldNames.Description}
                errorMessage={getErrorMessage(FieldNames.Description)}
                disabled={isFormDisabled}
              />
            </FormControl>
          )}
        />

        <Controller
          name={FieldNames.Domain}
          control={control}
          render={({ field }) => (
            <FormControl>
              <UiTextField
                {...field}
                label={FieldNames.Domain}
                errorMessage={getErrorMessage(FieldNames.Domain)}
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

import { Button, FormControl, Stack, StackProps, useTheme } from '@mui/material'
import { HTMLAttributes, useCallback } from 'react'
import { Controller } from 'react-hook-form'

import { createOrg, Organization } from '@/api/modules/orgs'
import { Icons } from '@/enums'
import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { useIdentityState } from '@/store'
import { UiIcon, UiImageUploader, UiTextField } from '@/ui'

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
  [FieldNames.Logo]: undefined as File | undefined,
  [FieldNames.Name]: '',
  [FieldNames.Description]: '',
  [FieldNames.Domain]: '',
}

export default function MetadataForm({ formProps, onOrgCreated, ...rest }: Props) {
  const { userDid } = useIdentityState()
  const { palette } = useTheme()

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
        // TODO: load to s3 and get url
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
        <Stack spacing={6} bgcolor={palette.background.light} p={6} borderRadius={4} my={6}>
          <Controller
            name={FieldNames.Logo}
            control={control}
            render={({ field }) => (
              <FormControl>
                <UiImageUploader {...field} label='Upload logo' disabled={isFormDisabled} />
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
                  label='Domain'
                  placeholder='https://'
                  errorMessage={getErrorMessage(FieldNames.Domain)}
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
                  label='Name'
                  placeholder='Company name'
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
                  label='Description'
                  multiline
                  rows={5}
                  placeholder='Write a small description'
                  errorMessage={getErrorMessage(FieldNames.Description)}
                  disabled={isFormDisabled}
                />
              </FormControl>
            )}
          />
        </Stack>

        <Button type='submit' size='large' endIcon={<UiIcon name={Icons.ArrowRight} size={4} />}>
          Create
        </Button>
      </form>
    </Stack>
  )
}

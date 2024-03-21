import { time } from '@distributedlab/tools'
import { Button, FormControl, Stack, StackProps } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { Controller } from 'react-hook-form'

import {
  OrgGroupRequest,
  OrgGroupRequestMetadata,
  OrgUserRoles,
  verifyOrgGroupRequest,
} from '@/api/modules/orgs'
import { VCGroupOverviewCard } from '@/common'
import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { UiDatePicker, UiImageUploader, UiSelect, UiTextField } from '@/ui'

interface Props extends StackProps {
  orgGroupRequest: OrgGroupRequest

  onRequestApproved?: () => Promise<void>
}

enum FieldNames {
  Title = 'title',
  Subtitle = 'subtitle',
  StartDate = 'startDate',
  EndDate = 'endDate',
  Role = 'role',
  BackgroundImage = 'backgroundImage',
  BackgroundHex = 'backgroundHex',
}

export default function CredentialsMetadataBuilder({
  orgGroupRequest,
  onRequestApproved,
  ...rest
}: Props) {
  const { org } = useOrgDetails()

  const DEFAULT_VALUES = useMemo<{
    [FieldNames.Title]: string
    [FieldNames.Subtitle]: string
    [FieldNames.StartDate]: string
    [FieldNames.EndDate]: string
    [FieldNames.Role]: OrgUserRoles
    [FieldNames.BackgroundImage]?: File
    [FieldNames.BackgroundHex]: string
  }>(
    () => ({
      [FieldNames.Title]: '',
      [FieldNames.Subtitle]: '',
      [FieldNames.StartDate]: '',
      [FieldNames.EndDate]: '',
      [FieldNames.Role]: OrgUserRoles.Employee,
      [FieldNames.BackgroundImage]: undefined,
      [FieldNames.BackgroundHex]: '',
    }),
    [],
  )

  const {
    formState,
    isFormDisabled,
    handleSubmit,
    disableForm,
    enableForm,
    getErrorMessage,
    control,
  } = useForm(DEFAULT_VALUES, yup => yup.object().shape({}))

  const vcMetadata = useMemo<OrgGroupRequestMetadata>(() => {
    return {
      title: formState[FieldNames.Title],
      subtitle: formState[FieldNames.Subtitle],
      appearance: {
        background: formState[FieldNames.BackgroundImage]
          ? URL.createObjectURL(formState[FieldNames.BackgroundImage])
          : formState[FieldNames.BackgroundHex],
      },
    }
  }, [formState])

  const submit = useCallback(async () => {
    disableForm()

    try {
      await verifyOrgGroupRequest({
        orgId: orgGroupRequest.org_id,
        groupId: orgGroupRequest.group_id,
        reqId: orgGroupRequest.id,
        role: formState[FieldNames.Role],
        metadata: vcMetadata,
      })

      await onRequestApproved?.()
    } catch (error) {
      ErrorHandler.process(error)
    }

    enableForm()
  }, [
    vcMetadata,
    disableForm,
    enableForm,
    formState,
    onRequestApproved,
    orgGroupRequest.group_id,
    orgGroupRequest.id,
    orgGroupRequest.org_id,
  ])

  return (
    <Stack {...rest} direction='row' spacing={6}>
      <form onSubmit={handleSubmit(submit)}>
        <Stack spacing={6}>
          <Controller
            name={FieldNames.Title}
            control={control}
            render={({ field }) => (
              <UiTextField
                {...field}
                label='title'
                errorMessage={getErrorMessage(FieldNames.Title)}
                disabled={isFormDisabled}
              />
            )}
          />
          <Controller
            name={FieldNames.Subtitle}
            control={control}
            render={({ field }) => (
              <UiTextField
                {...field}
                label='Subtitle'
                errorMessage={getErrorMessage(FieldNames.Subtitle)}
                disabled={isFormDisabled}
              />
            )}
          />

          <Stack direction='row' spacing={2}>
            <Controller
              name={FieldNames.StartDate}
              control={control}
              render={({ field }) => (
                <UiDatePicker
                  {...field}
                  label='Start date'
                  disablePast={true}
                  disabled={isFormDisabled}
                  errorMessage={getErrorMessage(FieldNames.StartDate)}
                />
              )}
            />

            <Controller
              name={FieldNames.EndDate}
              control={control}
              render={({ field }) => (
                <UiDatePicker
                  {...field}
                  minDate={formState[FieldNames.StartDate] || time().format()}
                  label='End date'
                  disabled={isFormDisabled}
                  errorMessage={getErrorMessage(FieldNames.EndDate)}
                />
              )}
            />
          </Stack>

          <Controller
            name={FieldNames.Role}
            control={control}
            render={({ field }) => (
              <UiSelect
                label='Role'
                {...field}
                options={Object.entries(OrgUserRoles).map(([key, value]) => ({
                  value: value,
                  label: key,
                }))}
                disabled={isFormDisabled}
              />
            )}
          />

          <Controller
            name={FieldNames.BackgroundHex}
            control={control}
            render={({ field }) => (
              <FormControl>
                <UiTextField
                  {...field}
                  label={FieldNames.BackgroundHex}
                  errorMessage={getErrorMessage(FieldNames.BackgroundHex)}
                  disabled={isFormDisabled}
                />
              </FormControl>
            )}
          />

          <Controller
            name={FieldNames.BackgroundImage}
            control={control}
            render={({ field }) => (
              <FormControl>
                <UiImageUploader
                  {...field}
                  label={FieldNames.BackgroundImage}
                  disabled={isFormDisabled}
                />
              </FormControl>
            )}
          />

          <Button type='submit' disabled={isFormDisabled}>
            Submit
          </Button>
        </Stack>
      </form>
      <VCGroupOverviewCard
        title={vcMetadata.title}
        subtitle={vcMetadata.subtitle}
        background={vcMetadata.appearance.background}
        expirationDate={formState[FieldNames.EndDate]}
        org={org}
      />
    </Stack>
  )
}

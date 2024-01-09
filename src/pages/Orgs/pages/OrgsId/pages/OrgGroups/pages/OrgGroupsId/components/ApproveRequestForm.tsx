import { time } from '@distributedlab/tools'
import { FormControl, Stack, StackProps, Typography } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'

import {
  OrgGroupRequest,
  OrgGroupVCsMetadata,
  OrgUserRoles,
  parseRequestCredentialSchemas,
  verifyOrgGroupRequest,
} from '@/api'
import { VCGroupOverviewCard } from '@/common'
import { ErrorHandler } from '@/helpers'
import { useForm, useLoading } from '@/hooks'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { UiBasicModal, UiButton, UiDatePicker, UiImageUploader, UiSelect, UiTextField } from '@/ui'

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
  BackgroundImage = 'background-image',
  BackgroundHex = 'background-hex',
}

function CredentialsMetadataBuilder({ orgGroupRequest, onRequestApproved, ...rest }: Props) {
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

  const VCMetadataPreview = useMemo<OrgGroupVCsMetadata>(() => {
    return {
      title: formState[FieldNames.Title],
      subtitle: formState[FieldNames.Subtitle],
      appearance: {
        background:
          (formState[FieldNames.BackgroundImage] &&
            URL.createObjectURL(formState[FieldNames.BackgroundImage])) ||
          formState[FieldNames.BackgroundHex],
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
        metadata: VCMetadataPreview,
      })

      await onRequestApproved?.()
    } catch (error) {
      ErrorHandler.process(error)
    }

    enableForm()
  }, [
    VCMetadataPreview,
    disableForm,
    enableForm,
    formState,
    onRequestApproved,
    orgGroupRequest.group_id,
    orgGroupRequest.id,
    orgGroupRequest.org_id,
  ])

  return (
    <Stack {...rest} direction='row' gap={6}>
      <form onSubmit={handleSubmit(submit)}>
        <Stack gap={6}>
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

          <Stack direction='row' gap={2}>
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
                label={'Role'}
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
                  // errorMessage={getErrorMessage(FieldNames.BackgroundImage)}
                  disabled={isFormDisabled}
                />
              </FormControl>
            )}
          />

          <UiButton type='submit' disabled={isFormDisabled}>
            Submit
          </UiButton>
        </Stack>
      </form>
      <VCGroupOverviewCard
        title={VCMetadataPreview.title ?? ''}
        subtitle={VCMetadataPreview.subtitle ?? ''}
        background={VCMetadataPreview.appearance.background}
        expirationDate={formState[FieldNames.EndDate]}
        org={org}
      />
    </Stack>
  )
}

export default function ApproveRequestForm({ orgGroupRequest, onRequestApproved, ...rest }: Props) {
  const [isModalShown, setIsModalShown] = useState(false)

  const { data: VCsFields } = useLoading([], () => parseRequestCredentialSchemas(orgGroupRequest), {
    loadOnMount: true,
    loadArgs: [orgGroupRequest],
  })

  return (
    <Stack {...rest} flex={1} p={5}>
      <Stack>
        {VCsFields.map((el, idx) => (
          <Stack key={idx}>
            <Typography>{el.key}</Typography>
            <Typography>{el.value}</Typography>
          </Stack>
        ))}
      </Stack>

      <Stack mt='auto' gap={2}>
        <UiButton onClick={() => setIsModalShown(true)}>Create Credential</UiButton>
        <UiButton color='error'>Reject</UiButton>
      </Stack>

      <UiBasicModal open={isModalShown} onClose={() => setIsModalShown(false)}>
        <CredentialsMetadataBuilder
          orgGroupRequest={orgGroupRequest}
          onRequestApproved={onRequestApproved}
        />
      </UiBasicModal>
    </Stack>
  )
}

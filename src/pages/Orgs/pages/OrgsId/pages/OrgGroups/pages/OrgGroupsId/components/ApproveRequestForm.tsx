import { time } from '@distributedlab/tools'
import { FormControl, Stack, StackProps } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'

import {
  OrgGroupRequest,
  OrgGroupRequestPerCredentialMetadata,
  OrgUserRoles,
  verifyOrgGroupRequest,
} from '@/api'
import { VCGroupOverviewCard } from '@/common'
import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
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
  Background = 'background',
}

/* TODO:
    implement https://www.figma.com/file/fiiwEsdA0WhvcBeJCexqso/PROOF?type=design&node-id=3033-50564&mode=dev form
    define metadata for request and how it will work
    how does "custom" metadata will appear in kyc-svc to publish VCs?
    how do we receive VCs after that in employee side?
    How to manage it's metadata
* */

function CredentialsMetadataBuilder({ orgGroupRequest, onRequestApproved, ...rest }: Props) {
  const DEFAULT_VALUES = useMemo<{
    [FieldNames.Title]: string
    [FieldNames.Subtitle]: string
    [FieldNames.StartDate]: string
    [FieldNames.EndDate]: string
    [FieldNames.Role]: OrgUserRoles
    [FieldNames.Background]?: File
  }>(
    () => ({
      [FieldNames.Title]: '',
      [FieldNames.Subtitle]: '',
      [FieldNames.StartDate]: '',
      [FieldNames.EndDate]: '',
      [FieldNames.Role]: OrgUserRoles.Employee,
      [FieldNames.Background]: undefined,
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

  const submit = useCallback(async () => {
    disableForm()

    try {
      await verifyOrgGroupRequest({
        orgId: orgGroupRequest.org_id,
        groupId: orgGroupRequest.group_id,
        reqId: orgGroupRequest.id,
        role: formState[FieldNames.Role],
        credMetadata: orgGroupRequest.metadata.map(el => ({
          schema: el.schema,
          fields: el.fields,
          metadata: {
            startDate: formState[FieldNames.StartDate]?.toString(), // TODO: refactor!
            endDate: formState[FieldNames.EndDate]?.toString(),
            title: formState[FieldNames.Title],
            subtitle: formState[FieldNames.Subtitle],
            orgId: orgGroupRequest.org_id,
            appearance: {
              background: '', // FIXME
            },
          },
        })),
      })

      await onRequestApproved?.()
    } catch (error) {
      ErrorHandler.process(error)
    }

    enableForm()
  }, [
    disableForm,
    enableForm,
    formState,
    onRequestApproved,
    orgGroupRequest.group_id,
    orgGroupRequest.id,
    orgGroupRequest.metadata,
    orgGroupRequest.org_id,
  ])

  /*
  Request contains all VC details which will be implemented for employee
  So we need to prepare appearance for card, and an array for detailed VCs properties
   */
  const VCMetadataPreview = useMemo<OrgGroupRequestPerCredentialMetadata[]>(() => {
    return orgGroupRequest.metadata.map(el => ({
      schema: el.schema,
      fields: el.fields,
      metadata: {
        startDate: formState[FieldNames.StartDate]?.toString(),
        endDate: formState[FieldNames.EndDate]?.toString(),
        title: formState[FieldNames.Title],
        subtitle: formState[FieldNames.Subtitle],
        orgId: orgGroupRequest.org_id,
        appearance: {
          background: formState[FieldNames.Background]
            ? URL.createObjectURL(formState[FieldNames.Background])
            : '',
        },
      },
    }))
  }, [formState, orgGroupRequest.metadata, orgGroupRequest.org_id])

  console.log(formState)

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
              render={({ field }) => {
                console.log(field)

                return (
                  <UiDatePicker
                    {...field}
                    label='Start date'
                    disablePast={true}
                    disabled={isFormDisabled}
                    errorMessage={getErrorMessage(FieldNames.StartDate)}
                  />
                )
              }}
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
            name={FieldNames.Background}
            control={control}
            render={({ field }) => (
              <FormControl>
                <UiImageUploader
                  {...field}
                  label={FieldNames.Background}
                  // errorMessage={getErrorMessage(FieldNames.Logo)}
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
      <VCGroupOverviewCard VCMetadataPreview={VCMetadataPreview} />
    </Stack>
  )
}

export default function ApproveRequestForm({ orgGroupRequest, onRequestApproved, ...rest }: Props) {
  const [isModalShown, setIsModalShown] = useState(false)

  return (
    <Stack {...rest} flex={1} p={5}>
      <Stack>
        {orgGroupRequest.metadata.map((el, idx) => (
          <div key={idx}>
            <div>{el.fields.field1}</div>
          </div>
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

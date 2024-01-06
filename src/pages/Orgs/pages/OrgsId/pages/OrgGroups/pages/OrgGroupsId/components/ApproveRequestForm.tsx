import { time } from '@distributedlab/tools'
import { Stack, StackProps } from '@mui/material'
import { Dayjs } from 'dayjs'
import { useCallback, useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'

import { OrgGroupRequest, OrgUserRoles, verifyOrgGroupRequest } from '@/api'
import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { UiBasicModal, UiButton, UiDatePicker, UiSelect } from '@/ui'

interface Props extends StackProps {
  orgGroupRequest: OrgGroupRequest

  onRequestApproved?: () => Promise<void>
}

enum FieldNames {
  StartDate = 'startDate',
  EndDate = 'endDate',
  Role = 'role',
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
    [FieldNames.StartDate]: Dayjs | undefined
    [FieldNames.EndDate]: Dayjs | undefined
    [FieldNames.Role]: OrgUserRoles
  }>(
    () => ({
      [FieldNames.StartDate]: undefined,
      [FieldNames.EndDate]: undefined,
      [FieldNames.Role]: OrgUserRoles.Employee,
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

  return (
    <Stack {...rest}>
      <form onSubmit={handleSubmit(submit)}>
        <Controller
          name={FieldNames.StartDate}
          control={control}
          render={({ field }) => (
            <UiDatePicker
              {...field}
              label='Start date'
              minDate={time().dayjs}
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
              label='End date'
              disabled={isFormDisabled}
              errorMessage={getErrorMessage(FieldNames.EndDate)}
            />
          )}
        />

        <Controller
          name={FieldNames.Role}
          control={control}
          render={({ field }) => (
            <UiSelect
              options={Object.entries(OrgUserRoles).map(([key, value]) => ({
                value: value,
                label: key,
              }))}
              {...field}
              disabled={isFormDisabled}
            />
          )}
        />
      </form>
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

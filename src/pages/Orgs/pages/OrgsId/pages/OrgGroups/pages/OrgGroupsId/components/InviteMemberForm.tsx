import { FormControl, Stack, StackProps } from '@mui/material'
import { HTMLAttributes, useCallback, useMemo } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'

import { OrgGroupCreatedRequest } from '@/api'
import { createInvitation } from '@/api/modules/orgs/helpers/org-groups-requests'
import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { useOrgGroupDetails } from '@/pages/Orgs/pages/OrgsId/pages/OrgGroups/hooks'
import { UiButton, UiTextField } from '@/ui'

interface Props extends StackProps {
  formProps?: HTMLAttributes<HTMLFormElement>
  onMemberInviteCreated?: (createdRequest: OrgGroupCreatedRequest) => void
}

enum FieldNames {
  Email = 'email',
  Rules = 'rules',
}

export default function InviteMemberForm({ formProps, onMemberInviteCreated, ...rest }: Props) {
  const { org } = useOrgDetails()
  const { orgGroup } = useOrgGroupDetails()

  const DEFAULT_VALUES = useMemo(
    () => ({
      [FieldNames.Email]: '',
      [FieldNames.Rules]: orgGroup.rules.map(rule => ({ ...rule, value: '' })),
    }),
    [orgGroup.rules],
  )

  const {
    formState,
    isFormDisabled,
    handleSubmit,
    disableForm,
    enableForm,
    getErrorMessage,
    register,
    control,
  } = useForm(DEFAULT_VALUES, yup =>
    yup.object().shape({
      [FieldNames.Email]: yup.string().email().required(),
    }),
  )

  const { fields: ruleFields } = useFieldArray({
    control,
    name: FieldNames.Rules, // unique name for your Field Array
  })

  const submit = useCallback(async () => {
    disableForm()

    try {
      const createdRequest = await createInvitation({
        orgId: org.id,
        groupId: orgGroup.id,
        email: formState[FieldNames.Email],
        rules: formState[FieldNames.Rules],
      })

      onMemberInviteCreated?.(createdRequest)
    } catch (error) {
      ErrorHandler.process(error)
    }

    enableForm()
  }, [disableForm, enableForm, formState, onMemberInviteCreated, org.id, orgGroup.id])

  return (
    <Stack {...rest}>
      <form {...formProps} onSubmit={handleSubmit(submit)}>
        <Controller
          name={FieldNames.Email}
          control={control}
          render={({ field }) => (
            <FormControl>
              <UiTextField
                {...field}
                label={FieldNames.Email}
                errorMessage={getErrorMessage(FieldNames.Email)}
                disabled={isFormDisabled}
              />
            </FormControl>
          )}
        />

        {ruleFields.map((field, idx) => (
          <FormControl key={field.id}>
            <UiTextField
              label={field.name}
              disabled={isFormDisabled}
              {...register(`${FieldNames.Rules}.${idx}.value`)}
            />
          </FormControl>
        ))}

        <UiButton type='submit'>Invite</UiButton>
      </form>
    </Stack>
  )
}

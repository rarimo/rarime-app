import { FormControl, Stack, StackProps } from '@mui/material'
import { HTMLAttributes, useCallback } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'

import {
  buildCredentialRequest,
  createInvitation,
  CredentialRequest,
  OrgGroupCreatedRequest,
} from '@/api/modules/orgs'
import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { useOrgGroupDetails } from '@/pages/Orgs/pages/OrgsId/pages/OrgGroups/hooks'
import { UiButton, UiTextField } from '@/ui'

interface Props extends StackProps {
  formProps?: HTMLAttributes<HTMLFormElement>
  onMemberInvitationCreated?: (createdRequest: OrgGroupCreatedRequest) => void
}

enum FieldNames {
  Email = 'email',
  Rules = 'rules',
}

export default function InviteMemberForm({ formProps, onMemberInvitationCreated, ...rest }: Props) {
  const { org } = useOrgDetails()
  const { orgGroup } = useOrgGroupDetails()

  const {
    formState,
    isFormDisabled,
    handleSubmit,
    disableForm,
    enableForm,
    getErrorMessage,
    register,
    control,
  } = useForm(
    {
      [FieldNames.Email]: '',
      [FieldNames.Rules]: orgGroup.rules.map(rule => ({ ...rule, value: '' })),
    },
    yup =>
      yup.object().shape({
        [FieldNames.Email]: yup.string().email().required(),
      }),
  )

  const { fields: vcFields } = useFieldArray({
    control,
    name: FieldNames.Rules,
  })

  const submit = useCallback(async () => {
    disableForm()

    try {
      const credentialRequests: CredentialRequest[] = await Promise.all(
        formState[FieldNames.Rules].map(el =>
          buildCredentialRequest(el.scheme, el.value, orgGroup.id),
        ),
      )

      const createdRequest = await createInvitation({
        orgId: org.id,
        groupId: orgGroup.id,
        email: formState[FieldNames.Email],
        credentialRequests,
      })

      onMemberInvitationCreated?.(createdRequest)
    } catch (error) {
      ErrorHandler.process(error)
    }

    enableForm()
  }, [disableForm, enableForm, formState, onMemberInvitationCreated, org.id, orgGroup.id])

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

        {vcFields.map((field, idx) => (
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

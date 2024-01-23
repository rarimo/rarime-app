import { FormControl, Stack, StackProps } from '@mui/material'
import lowerCase from 'lodash/lowerCase'
import upperFirst from 'lodash/upperFirst'
import { HTMLAttributes, useCallback } from 'react'
import { useFieldArray } from 'react-hook-form'

import { CredentialRequest, fillOrgGroupRequest, OrgGroupRequest } from '@/api/modules/orgs'
import { parsedCredentialSchemaProperty } from '@/api/modules/zkp'
import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { UiButton, UiTextField } from '@/ui'

enum FieldNames {
  CredentialRequests = 'credential-requests',
}

type Props = StackProps & {
  formProps?: HTMLAttributes<HTMLFormElement>
  credentialFields: parsedCredentialSchemaProperty[]
  orgGroupRequest: OrgGroupRequest
  onRequestFilled?: () => void
}

export default function RequestForm({
  formProps,
  credentialFields,
  orgGroupRequest,
  onRequestFilled,
  ...rest
}: Props) {
  const { formState, isFormDisabled, handleSubmit, disableForm, enableForm, register, control } =
    useForm(
      {
        [FieldNames.CredentialRequests]: credentialFields?.map(field => ({
          ...field,
          value: field.value || '',
        })),
      },
      yup => yup.object().shape({}),
    )

  const { fields: vcFormFields } = useFieldArray({
    control,
    name: FieldNames.CredentialRequests,
  })

  const submit = useCallback(async () => {
    disableForm()

    try {
      if (!orgGroupRequest) throw new TypeError('request is not defined')

      await fillOrgGroupRequest({
        orgId: orgGroupRequest.org_id,
        groupId: orgGroupRequest.group_id,
        reqId: orgGroupRequest.id,
        credReq: orgGroupRequest.credential_requests.map(credReq => {
          const key = credentialFields?.find(
            el => credReq.credential_subject[el.key] !== undefined,
          )?.key

          const value = formState[FieldNames.CredentialRequests].find(el => el.key === key)?.value

          return {
            ...credReq,
            credential_subject: {
              ...credReq.credential_subject,
              ...(key && value && { [key]: value }),
            },
          } as CredentialRequest
        }),
      })

      onRequestFilled?.()
    } catch (error) {
      ErrorHandler.process(error)
    }

    enableForm()
  }, [credentialFields, disableForm, enableForm, formState, onRequestFilled, orgGroupRequest])

  return (
    <Stack {...rest}>
      <form {...formProps} onSubmit={handleSubmit(submit)}>
        {vcFormFields.map((field, idx) => {
          const vcField = credentialFields?.[idx]

          const label = upperFirst(lowerCase(vcField?.key))

          return (
            <FormControl key={field.id}>
              <UiTextField
                key={idx}
                label={label}
                // TODO: add error message
                disabled={isFormDisabled}
                {...register(`${FieldNames.CredentialRequests}.${idx}.value`)}
              />
            </FormControl>
          )
        })}

        <UiButton type='submit'>Fill</UiButton>
      </form>
    </Stack>
  )
}

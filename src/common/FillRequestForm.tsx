import { FormControl, Stack, StackProps } from '@mui/material'
import startCase from 'lodash/startCase'
import { HTMLAttributes, useCallback } from 'react'
import { Controller } from 'react-hook-form'
import type { ObjectShape } from 'yup'

import { CredentialRequest, fillOrgGroupRequest, OrgGroupRequest } from '@/api/modules/orgs'
import { ParsedCredentialSchemaProperty } from '@/api/modules/zkp'
import { ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { useZkpSnapState } from '@/store'
import { UiButton, UiTextField } from '@/ui'

type Props = StackProps & {
  formProps?: HTMLAttributes<HTMLFormElement>
  credentialFields: ParsedCredentialSchemaProperty[]
  orgGroupRequest: OrgGroupRequest
  onRequestFilled?: () => void
}

export default function FillRequestForm({
  formProps,
  credentialFields,
  orgGroupRequest,
  onRequestFilled,
  ...rest
}: Props) {
  const { userDid } = useZkpSnapState()

  const {
    formState,
    isFormDisabled,
    handleSubmit,
    disableForm,
    enableForm,
    control,
    getErrorMessage,
  } = useForm(
    credentialFields?.reduce((acc, field) => {
      acc[field.key] = field.value || ''
      return acc
    }, {} as Record<string, string>),
    yup =>
      yup.object().shape({
        ...orgGroupRequest.group?.rules?.reduce((acc, rule) => {
          if (rule.required) acc[rule.name] = yup.string().required()

          return acc
        }, {} as ObjectShape),
      }),
  )

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

          const value = formState[key!]

          return {
            ...credReq,
            credential_subject: {
              ...credReq.credential_subject,
              id: userDid,
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
  }, [
    credentialFields,
    disableForm,
    enableForm,
    formState,
    onRequestFilled,
    orgGroupRequest,
    userDid,
  ])

  return (
    <Stack {...rest}>
      <form {...formProps} onSubmit={handleSubmit(submit)}>
        {Object.keys(formState).map((key, idx) => {
          return (
            <Controller
              key={idx}
              name={key}
              control={control}
              render={({ field }) => (
                <FormControl>
                  <UiTextField
                    {...field}
                    label={startCase(key)}
                    errorMessage={getErrorMessage(key)}
                    disabled={isFormDisabled}
                  />
                </FormControl>
              )}
            />
          )
        })}

        <UiButton type='submit'>Fill</UiButton>
      </form>
    </Stack>
  )
}

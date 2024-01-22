import { FormControl, Stack, StackProps } from '@mui/material'
import lowerCase from 'lodash/lowerCase'
import upperFirst from 'lodash/upperFirst'
import { useCallback, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import {
  CredentialRequest,
  fillOrgGroupRequest,
  loadOrgGroupRequestById,
  OrgGroupRequest,
} from '@/api'
import { parseFillRequestDetailsSearchParams } from '@/api/modules/auth'
import { loadAndParseCredentialSchema } from '@/api/modules/zkp'
import { ErrorHandler } from '@/helpers'
import { useForm, useLoading } from '@/hooks'
import { UiTextField } from '@/ui'

type Props = StackProps

enum FieldNames {
  CredentialRequests = 'credential-requests',
}

export default function FillRequestForm({ ...rest }: Props) {
  const [searchParams] = useSearchParams()

  const fillRequestDetails = useMemo(
    () => parseFillRequestDetailsSearchParams(searchParams),
    [searchParams],
  )

  const getRequestAndBuildFormFields = useCallback(async () => {
    if (!fillRequestDetails) throw new TypeError('request params is not defined')

    const orgGroupRequest = await loadOrgGroupRequestById(
      fillRequestDetails.orgId,
      fillRequestDetails.groupId,
      fillRequestDetails.reqId,
    )

    const vcFields = await Promise.all(
      orgGroupRequest.credential_requests.map(req =>
        loadAndParseCredentialSchema(req.credential_schema, req.credential_subject),
      ),
    )

    return {
      orgGroupRequest,
      vcFields,
    }
  }, [fillRequestDetails])

  const {
    data: { orgGroupRequest, vcFields },
  } = useLoading<{
    orgGroupRequest: OrgGroupRequest
    vcFields: { key: string; type: string; value: string }[]
  }>(
    {
      orgGroupRequest: {} as OrgGroupRequest,
      vcFields: [],
    },
    getRequestAndBuildFormFields,
    {
      loadOnMount: !!fillRequestDetails,
      loadArgs: [fillRequestDetails],
    },
  )

  const { formState, isFormDisabled, handleSubmit, disableForm, enableForm, register, control } =
    useForm(
      {
        [FieldNames.CredentialRequests]: vcFields?.map(field => ({
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
      if (!fillRequestDetails) throw new TypeError('request params is not defined')

      await fillOrgGroupRequest({
        orgId: fillRequestDetails.orgId,
        groupId: fillRequestDetails.groupId,
        reqId: fillRequestDetails.reqId,
        credReq: orgGroupRequest.credential_requests.map(credReq => {
          const key = vcFields?.find(el => !!credReq.credential_subject[el.key])?.key

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
    } catch (error) {
      ErrorHandler.process(error)
    }

    enableForm()
  }, [
    disableForm,
    enableForm,
    fillRequestDetails,
    formState,
    orgGroupRequest.credential_requests,
    vcFields,
  ])

  return (
    <Stack {...rest}>
      <form onSubmit={handleSubmit(submit)}>
        {vcFormFields.map((field, idx) => {
          const vcField = vcFields?.[idx]

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
      </form>
    </Stack>
  )
}

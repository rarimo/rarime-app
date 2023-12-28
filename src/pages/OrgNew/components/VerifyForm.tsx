import { Stack, StackProps, Typography } from '@mui/material'
import { HTMLAttributes, useCallback, useState } from 'react'

import { getOrgVerificationCode, Organization, verifyOrg } from '@/api'
import { ErrorHandler } from '@/helpers'
import { useLoading } from '@/hooks'
import { UiButton } from '@/ui'

interface Props extends StackProps {
  org: Organization
  formProps?: HTMLAttributes<HTMLFormElement>
}

export default function VerifyForm({ org, formProps, ...rest }: Props) {
  const submit = useCallback(async () => {
    try {
      formProps?.onSubmit(await verifyOrg(org.id))
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [formProps, org.id])

  const loadOrgVerificationCode = useCallback(async () => {
    const { data } = await getOrgVerificationCode(org.id)

    return data.code
  }, [org.id])

  const { data: verificationCode } = useLoading('', loadOrgVerificationCode, {
    loadOnMount: true,
  })

  return (
    <Stack {...rest}>
      <form onSubmit={submit}>
        <Typography textAlign='center'>{verificationCode}</Typography>
        <Typography textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad aliquid
          architecto assumenda blanditiis delectus distinctio dolorum, ea eligendi ex facilis id
          laudantium nostrum nulla perspiciatis provident quibusdam sequi.
        </Typography>
        <Typography textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad aliquid
          architecto assumenda blanditiis delectus distinctio dolorum, ea eligendi ex facilis id
          laudantium nostrum nulla perspiciatis provident quibusdam sequi.
        </Typography>
        <Typography textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad aliquid
          architecto assumenda blanditiis delectus distinctio dolorum, ea eligendi ex facilis id
          laudantium nostrum nulla perspiciatis provident quibusdam sequi.
        </Typography>
        <Typography textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad aliquid
          architecto assumenda blanditiis delectus distinctio dolorum, ea eligendi ex facilis id
          laudantium nostrum nulla perspiciatis provident quibusdam sequi.
        </Typography>
        <Typography textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad aliquid
          architecto assumenda blanditiis delectus distinctio dolorum, ea eligendi ex facilis id
          laudantium nostrum nulla perspiciatis provident quibusdam sequi.
        </Typography>
        <Typography textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad aliquid
          architecto assumenda blanditiis delectus distinctio dolorum, ea eligendi ex facilis id
          laudantium nostrum nulla perspiciatis provident quibusdam sequi.
        </Typography>
        <Typography textAlign='center'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad aliquid
          architecto assumenda blanditiis delectus distinctio dolorum, ea eligendi ex facilis id
          laudantium nostrum nulla perspiciatis provident quibusdam sequi.
        </Typography>

        <UiButton type='submit'>Verify</UiButton>
      </form>
    </Stack>
  )
}

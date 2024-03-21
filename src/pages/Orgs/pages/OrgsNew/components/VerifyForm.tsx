import { Button, Stack, StackProps, Typography } from '@mui/material'
import { HTMLAttributes, useCallback } from 'react'

import { getOrgVerificationCode, Organization, verifyOrg } from '@/api/modules/orgs'
import { ErrorHandler } from '@/helpers'
import { useLoading } from '@/hooks'

interface Props extends StackProps {
  org: Organization
  formProps?: HTMLAttributes<HTMLFormElement>
  onOrgVerified?: () => Promise<void>
}

export default function VerifyForm({ org, formProps, onOrgVerified, ...rest }: Props) {
  const submit = useCallback(async () => {
    try {
      await verifyOrg(org.id)

      await onOrgVerified?.()
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [onOrgVerified, org.id])

  const loadOrgVerificationCode = useCallback(async () => {
    const { code } = await getOrgVerificationCode(org.id)

    return code
  }, [org.id])

  const { data: verificationCode } = useLoading('', loadOrgVerificationCode, {
    loadOnMount: true,
  })

  return (
    <Stack {...rest}>
      <form {...formProps} onSubmit={submit}>
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

        <Button type='submit'>Verify</Button>
      </form>
    </Stack>
  )
}

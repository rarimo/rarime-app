import { Stack, StackProps } from '@mui/material'
import { useCallback, useState } from 'react'

import { OrgGroupRequest, rejectOrgGroupRequest } from '@/api'
import { ErrorHandler } from '@/helpers'
import { UiBasicModal, UiButton } from '@/ui'

import CredentialsMetadataBuilder from './CredentialsMetadataBuilder'

interface Props extends StackProps {
  orgGroupRequest: OrgGroupRequest

  onRequestApproved?: () => Promise<void>
  onRequestRejected?: () => Promise<void>
}

export default function ApproveRequestForm({
  orgGroupRequest,
  onRequestApproved,
  onRequestRejected,
  ...rest
}: Props) {
  const [isModalShown, setIsModalShown] = useState(false)

  const rejectRequest = useCallback(async () => {
    try {
      await rejectOrgGroupRequest({
        orgId: orgGroupRequest.org_id,
        groupId: orgGroupRequest.group_id,
        reqId: orgGroupRequest.id,
      })

      onRequestRejected?.()
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [onRequestRejected, orgGroupRequest.group_id, orgGroupRequest.id, orgGroupRequest.org_id])

  return (
    <Stack {...rest} flex={1} p={5}>
      <UiButton onClick={() => setIsModalShown(true)}>Create Credential</UiButton>
      <UiButton onClick={rejectRequest} color='error'>
        Reject
      </UiButton>

      <UiBasicModal open={isModalShown} onClose={() => setIsModalShown(false)}>
        <CredentialsMetadataBuilder
          orgGroupRequest={orgGroupRequest}
          onRequestApproved={onRequestApproved}
        />
      </UiBasicModal>
    </Stack>
  )
}

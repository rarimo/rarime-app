import { Stack, StackProps } from '@mui/material'
import { useMemo } from 'react'

import { OrgGroupRequest } from '@/api/modules/orgs'
import { VCGroupOverviewCard } from '@/common'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'

interface Props extends StackProps {
  orgGroupRequest: OrgGroupRequest
}

export default function ApprovedCard({ orgGroupRequest, ...rest }: Props) {
  const { org } = useOrgDetails()

  const expirationDate = useMemo(() => {
    return orgGroupRequest.credential_requests?.[0].expiration
  }, [orgGroupRequest.credential_requests])

  return (
    <Stack {...rest}>
      <VCGroupOverviewCard
        title={orgGroupRequest.metadata.title}
        subtitle={orgGroupRequest.metadata.subtitle}
        background={orgGroupRequest.metadata.appearance?.background}
        expirationDate={expirationDate}
        org={org}
      />
    </Stack>
  )
}

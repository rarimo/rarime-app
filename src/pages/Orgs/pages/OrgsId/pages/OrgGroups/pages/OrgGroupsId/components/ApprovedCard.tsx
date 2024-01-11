import { Stack, StackProps } from '@mui/material'
import { useMemo } from 'react'

import { loadOrgGroupReqMetadataById, OrgGroupRequest, OrgGroupVCsMetadata } from '@/api'
import { VCGroupOverviewCard } from '@/common'
import { useLoading } from '@/hooks'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'

interface Props extends StackProps {
  orgGroupRequest: OrgGroupRequest
}

export default function ApprovedCard({ orgGroupRequest, ...rest }: Props) {
  const { org } = useOrgDetails()

  const metadataId = useMemo(() => {
    return orgGroupRequest.credential_requests?.[0].credential_subject.metadata_id
  }, [orgGroupRequest.credential_requests])

  const expirationDate = useMemo(() => {
    return orgGroupRequest.credential_requests?.[0].expiration
  }, [orgGroupRequest.credential_requests])

  const { data: orgGroupVCsMetadata } = useLoading(
    {} as OrgGroupVCsMetadata,
    () => {
      return loadOrgGroupReqMetadataById(metadataId)
    },
    {
      loadOnMount: true,
      loadArgs: [metadataId],
    },
  )

  return (
    <Stack {...rest}>
      <VCGroupOverviewCard
        title={orgGroupVCsMetadata.title}
        subtitle={orgGroupVCsMetadata.subtitle}
        background={orgGroupVCsMetadata.appearance?.background}
        expirationDate={expirationDate}
        org={org}
      />
    </Stack>
  )
}

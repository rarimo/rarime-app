import { Stack, StackProps, Typography } from '@mui/material'
import { useMemo } from 'react'

import { OrgGroupRequestPerCredentialMetadata } from '@/api'

interface Props extends StackProps {
  VCMetadataPreview: OrgGroupRequestPerCredentialMetadata[]
}

/*
This card is a group of credentials with different schemas and it's metadata
TODO: get common things from metadata and reduce schemas

props for this component could be received by loading all

how to load org metadata here? e. g. logo, name, etc.
 */
export default function VCGroupOverviewCard({ VCMetadataPreview, ...rest }: Props) {
  const appearance = useMemo(() => {
    return {
      title: VCMetadataPreview[0].metadata.title,
      subtitle: VCMetadataPreview[0].metadata.subtitle,
      startDate: VCMetadataPreview[0].metadata.startDate,
      endDate: VCMetadataPreview[0].metadata.endDate,
      background: VCMetadataPreview[0].metadata.appearance.background,
    }
  }, [VCMetadataPreview])

  return (
    <Stack
      {...rest}
      sx={{
        background: `url("${appearance.background}") no-repeat center center / cover`,
        minWidth: 300,
      }}
    >
      <Typography>{appearance.title}</Typography>
      <Typography>{appearance.subtitle}</Typography>
      <Typography>{appearance.startDate}</Typography>
      <Typography>{appearance.endDate}</Typography>
    </Stack>
  )
}

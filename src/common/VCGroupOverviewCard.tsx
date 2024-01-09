import { Avatar, Stack, StackProps, Typography } from '@mui/material'
import { W3CCredential } from '@rarimo/rarime-connector'
import { useMemo } from 'react'

import { CredentialRequest, Organization, OrgGroupVCsMetadata } from '@/api'

interface Props extends StackProps {
  VCMetadataPreview: OrgGroupVCsMetadata
  VCs: CredentialRequest[] | W3CCredential[]
  org: Organization
}

export default function VCGroupOverviewCard({ org, VCMetadataPreview, ...rest }: Props) {
  const isBgImage = useMemo(() => {
    try {
      return Boolean(new URL(VCMetadataPreview.appearance.background))
    } catch (error) {
      return false
    }
  }, [VCMetadataPreview.appearance.background])

  const bg = useMemo(() => {
    return isBgImage
      ? `url("${VCMetadataPreview.appearance.background}") no-repeat center center / cover`
      : VCMetadataPreview.appearance.background
  }, [VCMetadataPreview.appearance.background, isBgImage])

  return (
    <Stack
      {...rest}
      sx={{
        background: bg,
        minWidth: 300,
      }}
    >
      <Typography>{VCMetadataPreview.title}</Typography>
      <Typography>{VCMetadataPreview.subtitle}</Typography>
      <Avatar src={org.metadata.logoUrl} alt={org.metadata.name} />
    </Stack>
  )
}

import { Avatar, Stack, StackProps, Typography } from '@mui/material'
import { useMemo } from 'react'

import { Organization } from '@/api'

interface Props extends StackProps {
  title: string
  subtitle: string
  background: string
  expirationDate: string

  org: Organization
}

export default function VCGroupOverviewCard({
  title,
  subtitle,
  background,
  expirationDate,
  org,
  ...rest
}: Props) {
  const isBgImage = useMemo(() => {
    try {
      return Boolean(new URL(background))
    } catch (error) {
      return false
    }
  }, [background])

  const bg = useMemo(() => {
    return isBgImage ? `url("${background}") no-repeat center center / cover` : background
  }, [background, isBgImage])

  return (
    <Stack
      {...rest}
      sx={{
        background: bg,
        minWidth: 300,
      }}
    >
      <Typography>{title}</Typography>
      <Typography>{subtitle}</Typography>
      <Typography>{expirationDate}</Typography>
      <Typography>{org.metadata.name}</Typography>
      <Avatar src={org.metadata.logoUrl} alt={org.metadata.name} />
    </Stack>
  )
}

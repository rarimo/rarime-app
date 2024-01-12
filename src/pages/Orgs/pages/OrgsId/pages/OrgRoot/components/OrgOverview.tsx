import { Avatar, Box, Stack, StackProps, Typography, useTheme } from '@mui/material'

import { Organization, OrgsStatuses } from '@/api'
import { UiIcon } from '@/ui'

interface Props extends StackProps {
  org: Organization
}

export default function OrgOverview({ org, ...rest }: Props) {
  const { palette, spacing } = useTheme()

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      border={1}
      borderColor={palette.divider}
      borderRadius={2}
      p={6}
      {...rest}
    >
      <Stack spacing={2}>
        <Stack direction={'row'} spacing={1} alignItems={'center'} mt={4}>
          <Typography variant={'h5'} color={palette.text.primary}>
            {org.metadata.name}
          </Typography>

          {org.status.value === OrgsStatuses.Verified && (
            <UiIcon componentName={'verified'} size={5} sx={{ color: palette.success.main }} />
          )}
        </Stack>

        <Typography variant={'body2'} color={palette.text.secondary}>
          {org.domain}
        </Typography>

        <Stack direction={'row'} spacing={2} alignItems={'center'} color={palette.text.secondary}>
          <Typography variant={'body4'}>{org.members_count} Associated people</Typography>
          <Box bgcolor={palette.divider} width={3} height={3} borderRadius={1} />
          <Typography variant={'body4'}>{org.issued_claims_count} Credentials</Typography>
        </Stack>
      </Stack>

      <Avatar
        src={org.metadata.logoUrl}
        alt={org.metadata.name}
        sx={{
          width: spacing(16),
          height: spacing(16),
          borderRadius: 250,
          objectFit: 'cover',
        }}
      />
    </Stack>
  )
}

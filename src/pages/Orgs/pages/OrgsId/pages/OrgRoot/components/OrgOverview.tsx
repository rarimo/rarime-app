import { Avatar, Stack, Typography, useTheme } from '@mui/material'

import { OrgsStatuses } from '@/api/modules/orgs'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { UiIcon } from '@/ui'

export default function OrgOverview() {
  const { org } = useOrgDetails()
  const { palette, spacing } = useTheme()

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={4}
      bgcolor={palette.background.light}
      p={6}
      border={1}
      borderColor={palette.divider}
      borderRadius={4}
    >
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

      <Stack spacing={2}>
        <Stack direction='row' spacing={1} alignItems='center' mt={4}>
          <Typography variant='h6' color={palette.text.primary}>
            {org.metadata.name}
          </Typography>

          {org.status.value === OrgsStatuses.Verified && (
            <UiIcon componentName='verified' size={4} sx={{ color: palette.success.main }} />
          )}
        </Stack>

        <Typography variant='body3' color={palette.text.secondary}>
          {org.metadata.description}
        </Typography>

        <Stack direction='row' spacing={6} color={palette.text.secondary}>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='body4'>Associated people</Typography>
            <Typography variant='subtitle5' color={palette.text.primary}>
              {org.members_count}
            </Typography>
          </Stack>
          <Stack direction='row' spacing={1} alignItems='center'>
            <Typography variant='body4'>Credentials</Typography>
            <Typography variant='subtitle5' color={palette.text.primary}>
              {org.issued_claims_count}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

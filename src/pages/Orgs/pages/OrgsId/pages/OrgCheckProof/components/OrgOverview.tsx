import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'

import { Organization, OrgsStatuses } from '@/api'
import { UiIcon } from '@/ui'

interface Props {
  org: Organization
}

export default function OrgOverview({ org }: Props) {
  const { palette, spacing } = useTheme()

  return (
    <Stack alignItems={'center'}>
      <Box
        component={'img'}
        src={org.metadata.logoUrl}
        alt={org.metadata.name}
        width={spacing(20)}
        height={spacing(20)}
        borderRadius={'9999px'}
        sx={{ objectFit: 'cover' }}
      />

      <Stack direction={'row'} spacing={1} alignItems={'center'} mt={4}>
        <Typography variant={'h5'}>{org.metadata.name}</Typography>
        {org.status.value === OrgsStatuses.Verified && (
          <UiIcon componentName={'verified'} size={5} sx={{ color: palette.success.main }} />
        )}
      </Stack>

      <Typography mt={2} variant={'body2'}>
        {org.domain}
      </Typography>

      <Stack
        mt={6}
        display={'grid'}
        gridTemplateColumns={'1fr 1px 1fr'}
        gap={6}
        textAlign={'center'}
      >
        <Box>
          <Typography variant={'h6'}>{org.members_count}</Typography>
          <Typography variant={'body2'}>Associated people</Typography>
        </Box>
        <Divider orientation={'vertical'} flexItem />
        <Box>
          <Typography variant={'h6'}>{org.issued_claims_count}</Typography>
          <Typography variant={'body2'}>Credentials</Typography>
        </Box>
      </Stack>
    </Stack>
  )
}

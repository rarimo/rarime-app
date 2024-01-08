import { Avatar, Card, CardProps, Grid, Stack, Typography, useTheme } from '@mui/material'

import { Organization, OrgsStatuses } from '@/api'
import { UiIcon } from '@/ui'

interface Props extends CardProps {
  org: Organization
}

export default function ListCard({ org, ...rest }: Props) {
  const { palette, typography } = useTheme()
  return (
    <Card
      {...rest}
      sx={{ py: 5, px: 6, borderRadius: 3, borderColor: palette.grey[300] }}
      variant='outlined'
    >
      <Avatar src={org.metadata.logoUrl} sx={{ width: 64, height: 64 }} />
      <Stack direction={'row'} alignItems={'center'} mt={5}>
        <Typography color={palette.text.primary} variant={'h6'} fontWeight={500}>
          {org.metadata.name}
        </Typography>
        {org.status.value === OrgsStatuses.Verified && (
          <UiIcon
            componentName={'verified'}
            sx={{ ml: 1, color: palette.success.light }}
            width={16}
            height={16}
          />
        )}
      </Stack>
      <Typography color={palette.text.secondary} fontSize={typography.body2} my={3}>
        {org.metadata.description}
      </Typography>
      <Grid container mt={5} pt={5} borderTop={1} borderColor={palette.grey[300]}>
        <Grid item xs={7}>
          <Typography
            fontSize={10}
            fontWeight={typography.fontWeightBold}
            color={palette.text.secondary}
            textTransform={'uppercase'}
          >
            Asocciated people
          </Typography>
          <Typography mt={2} color={palette.text.primary} fontSize={typography.overline}>
            {org.members_count}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography
            fontSize={10}
            fontWeight={typography.fontWeightBold}
            color={palette.text.secondary}
            textTransform={'uppercase'}
          >
            Credential
          </Typography>
          <Typography mt={2} color={palette.text.primary} fontSize={typography.overline}>
            {org.issued_claims_count}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

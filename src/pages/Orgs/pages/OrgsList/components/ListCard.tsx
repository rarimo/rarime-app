import { Avatar, Card, CardProps, Grid, Stack, Typography, useTheme } from '@mui/material'
import { generatePath, NavLink } from 'react-router-dom'

import { Organization, OrgsStatuses } from '@/api'
import { RoutePaths } from '@/enums'
import { UiIcon } from '@/ui'

interface Props extends CardProps {
  org: Organization
}

export default function ListCard({ org, ...rest }: Props) {
  const { palette } = useTheme()

  return (
    <NavLink to={generatePath(RoutePaths.OrgsId, { id: org.id })}>
      <Card
        {...rest}
        // TODO: change color
        sx={{ py: 5, px: 6, borderRadius: 3, borderColor: palette.grey[300], ...rest.sx }}
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
              size={4}
            />
          )}
        </Stack>
        <Typography color={palette.text.secondary} variant={'body2'} my={3}>
          {org.metadata.description}
        </Typography>

        <Grid
          container
          mt={5}
          pt={5}
          borderTop={1}
          // TODO: change color
          borderColor={palette.grey[300]}
        >
          <Grid item xs={7}>
            <Typography variant={'body3'} as={'p'} color={palette.text.secondary}>
              {'Associated people'}
            </Typography>
            <Typography mt={2} color={palette.text.primary} variant={'overline'}>
              {org.members_count}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant={'body3'} as={'p'} color={palette.text.secondary}>
              {'Credentials'}
            </Typography>
            <Typography mt={2} color={palette.text.primary} variant={'overline'}>
              {org.issued_claims_count}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </NavLink>
  )
}

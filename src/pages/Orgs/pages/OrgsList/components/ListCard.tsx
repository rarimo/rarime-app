import { Avatar, Card, CardProps, Grid, Stack, Typography, useTheme } from '@mui/material'
import { generatePath, NavLink } from 'react-router-dom'

import { Organization, OrgsStatuses } from '@/api/modules/orgs'
import { Icons, RoutePaths } from '@/enums'
import { Transitions } from '@/theme/constants'
import { UiIcon } from '@/ui'

interface Props extends CardProps {
  org: Organization
}

export default function ListCard({ org, ...rest }: Props) {
  const { palette, spacing } = useTheme()

  return (
    <NavLink to={generatePath(RoutePaths.OrgsId, { id: org.id })}>
      <Card
        {...rest}
        sx={{
          py: 5,
          px: 6,
          borderRadius: 3,
          bgcolor: palette.background.light,
          borderColor: palette.additional.layerBorder,
          transition: Transitions.Default,
          '&:hover': {
            borderColor: palette.action.hover,
          },
          ...rest.sx,
        }}
        variant='outlined'
      >
        <Avatar src={org.metadata.logoUrl} sx={{ width: spacing(12), height: spacing(12) }} />
        <Stack direction='row' alignItems='center' mt={5}>
          <Typography color={palette.text.primary} variant='h6'>
            {org.metadata.name}
          </Typography>
          {org.status.value === OrgsStatuses.Verified && (
            <UiIcon name={Icons.SealCheck} sx={{ ml: 1, color: palette.success.main }} size={4} />
          )}
        </Stack>
        <Typography color={palette.text.secondary} variant='body3' my={3}>
          {org.metadata.description}
        </Typography>

        <Grid container mt={5} pt={5} borderTop={1} borderColor={palette.divider}>
          <Grid item xs={7}>
            <Typography variant='body4' component='p' color={palette.text.secondary}>
              Associated people
            </Typography>
            <Typography mt={2} color={palette.text.primary} variant='subtitle4'>
              {org.members_count}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant='body4' component='p' color={palette.text.secondary}>
              Credentials
            </Typography>
            <Typography mt={2} color={palette.text.primary} variant='subtitle4'>
              {org.issued_claims_count}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </NavLink>
  )
}

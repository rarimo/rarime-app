import { Avatar, Card, Grid, PaperProps, Typography, useTheme } from '@mui/material'

import { Organization } from '@/api'

interface Props extends PaperProps {
  org: Organization
}

export default function ListCard({ org, ...rest }: Props) {
  const { palette, typography } = useTheme()
  return (
    <Card {...rest} sx={{ py: 5, px: 6, borderRadius: 3 }} variant='outlined'>
      {/*TODO: add real logo*/}
      <Avatar src={org.metadata.logoUrl} sx={{ width: 64, height: 64 }} />
      <Typography color={palette.text.primary} variant={'h6'} mt={5}>
        {org.metadata.name}
      </Typography>
      <Typography color={palette.text.secondary} fontSize={typography.body2} my={3}>
        {org.metadata.description}
      </Typography>
      <Grid container mt={5} pt={5} borderTop={1} borderColor={palette.text.secondary}>
        <Grid item xs={5}>
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

import { Paper, Stack, Typography, useTheme } from '@mui/material'

import { RarimeAppBadges } from '@/common'

export default function RarimeAppBlock() {
  const { palette } = useTheme()

  return (
    <Paper
      component={Stack}
      direction='row'
      spacing={6}
      justifyContent='space-between'
      alignItems='center'
      sx={{
        bgcolor: palette.action.active,
        border: 0,
      }}
    >
      <Stack spacing={1}>
        <Typography variant='subtitle3'>Download Rarime App</Typography>
        <Typography variant='body3' color={palette.text.secondary}>
          Claim airdrops & earn RMO
        </Typography>
      </Stack>
      <RarimeAppBadges spacing={4} />
    </Paper>
  )
}

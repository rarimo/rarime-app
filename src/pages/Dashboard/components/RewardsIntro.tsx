import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { Icons, RoutePaths } from '@/enums'
import { UiIcon } from '@/ui'

export default function RewardsIntro() {
  const { palette, spacing } = useTheme()

  return (
    <Paper component={Stack} spacing={6} position='relative' alignItems='flex-start' sx={{ p: 10 }}>
      <Stack spacing={2}>
        <Typography variant='subtitle2'>Enter into rewards program</Typography>
        <Typography variant='body2' color={palette.text.secondary}>
          Claim airdrops & earn RMO
        </Typography>
      </Stack>

      <Button
        component={NavLink}
        to={RoutePaths.Rewards}
        size='medium'
        endIcon={<UiIcon name={Icons.ArrowRight} size={5} />}
        sx={{
          height: spacing(10),
          width: spacing(40),
        }}
      >
        {`Let's start`}
      </Button>

      <Box
        component='img'
        src='/imgs/rewards-coins.png'
        alt='Rewards coins'
        width={spacing(80)}
        position='absolute'
        top={0}
        right={0}
        sx={{ pointerEvents: 'none' }}
      />
    </Paper>
  )
}

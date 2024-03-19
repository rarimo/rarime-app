import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'

import { useLoading } from '@/hooks'
import { rewardsStore } from '@/store'

// TODO: Update UI when design is ready
export default function ProgramAuth() {
  const { palette, spacing } = useTheme()
  const { isLoading, reload } = useLoading(undefined, rewardsStore.authorize, {
    loadOnMount: false,
  })

  return (
    <Paper component={Stack} spacing={8} position='relative'>
      <Box
        component='img'
        src='/imgs/rewards-bg.png'
        alt='Rewards'
        width='100%'
        position='absolute'
        top={0}
        left={0}
        sx={{ pointerEvents: 'none' }}
      />
      <Stack spacing={5} maxWidth={spacing(120)} width='100%' mx='auto' textAlign='center'>
        <Box
          component='img'
          src='/imgs/rarimo-rewards.png'
          alt='Rarimo rewards'
          height={spacing(28)}
          width='auto'
          sx={{ objectFit: 'contain' }}
        />
        <Stack spacing={2}>
          <Typography variant='h6'>Sign in to rewards program</Typography>
          <Typography variant='body2' color={palette.text.secondary}>
            Claim airdrops & earn RMO
          </Typography>
        </Stack>
        <Divider />
        <Button
          fullWidth
          size='large'
          startIcon={isLoading && <CircularProgress size={spacing(5)} color='secondary' />}
          disabled={isLoading}
          onClick={reload}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </Stack>
    </Paper>
  )
}

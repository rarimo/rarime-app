import { Box, Stack, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { config } from '@/config'
import { vh } from '@/theme/helpers'

const AuthLayout = () => {
  const { palette, spacing } = useTheme()

  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      height={vh(100)}
      width='100%'
      bgcolor={palette.background.light}
    >
      <Box position='absolute' top={spacing(6)} left={spacing(10)}>
        <Box component={'img'} src='/branding/logo-sign-in.svg' alt={config.APP_NAME} />
      </Box>

      <Stack direction='column' alignItems='center' justifyContent='center' width='100%'>
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default AuthLayout

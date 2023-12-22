import { Box, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { config } from '@/config'

const AuthLayout = () => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      height='100vh'
      width='100%'
      sx={{
        backgroundImage: 'url("/imgs/app-bg.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Box position='absolute' top={25} left={25}>
        <img src='/branding/logo-sign-in.svg' alt={config.APP_NAME} />
      </Box>

      <Stack direction='column' alignItems='center' justifyContent='center'>
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default AuthLayout

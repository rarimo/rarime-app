import { Box, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { config } from '@/config'
import { vh } from '@/theme/helpers'

const AuthLayout = () => {
  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      height={vh(100)}
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

      <Stack direction='column' alignItems='center' justifyContent='center' width='100%'>
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default AuthLayout

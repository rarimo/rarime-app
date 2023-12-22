import { Box, BoxProps, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { config } from '@/config'

const AuthLayout = () => {
  const bgBoxProps: BoxProps = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  }

  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      height='100vh'
      width='100%'
      sx={{
        backgroundColor: 'background.paper',
        backgroundImage: 'url("/imgs/app-bg.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundSize: '50% / cover',
        backdropFilter: 'opacity(0.1)',
      }}
    >
      <Box
        {...bgBoxProps}
        sx={{
          backgroundColor: 'background.default',
          opacity: 0.25,
          filter: 'blur(2px)',
        }}
      />

      <Box
        {...bgBoxProps}
        sx={{ background: 'url("/imgs/cells-bg.png") repeat top center / contain' }}
      />

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

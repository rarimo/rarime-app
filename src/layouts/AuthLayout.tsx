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
      bgcolor='#fff'
      sx={{
        backgroundImage: 'url("/imgs/app-bg.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        backgroundSize: '50% / cover',
        backdropFilter: 'opacity(0.1)',
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'var(--col-bg)',
          opacity: 0.25,
          filter: 'blur(2px)',
          zIndex: 'var(--z-index-hidden)',
        }}
      />

      <Box
        sx={{
          background: 'url("/imgs/cells-bg.png") repeat top center / contain',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 'var(--z-index-hidden)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '25px',
          left: '65px',
        }}
      >
        <img src='/branding/logo-sign-in.svg' alt={config.APP_NAME} />
      </Box>

      <Stack flexDirection='column' alignItems='center' justifyContent='center'>
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default AuthLayout

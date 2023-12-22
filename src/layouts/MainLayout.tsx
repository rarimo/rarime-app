import { Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

import AppNavbar from '@/components/AppNavbar'

const MainLayout = () => {
  return (
    <Stack direction='row' p={3} spacing={3} height='100vh'>
      <AppNavbar />
      <Stack
        width='100%'
        borderRadius={2}
        px={4}
        py={3}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default MainLayout

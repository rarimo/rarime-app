import { Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { AppNavbar } from '@/common'

const MainLayout = () => {
  return (
    <Stack direction='row' px={4} py={5} spacing={4} height='calc(100 * var(--vh, 1vh))'>
      <AppNavbar />
      <Stack
        overflow='hidden auto'
        width='100%'
        height='100%'
        borderRadius={4}
        px={8}
        py={6}
        sx={{ backgroundColor: 'background.paper' }}
      >
        <Outlet />
      </Stack>
    </Stack>
  )
}

export default MainLayout

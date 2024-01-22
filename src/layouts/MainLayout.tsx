import { Stack, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { AppNavbar } from '@/common'
import { vh } from '@/theme/helpers'

const MainLayout = () => {
  const { spacing } = useTheme()

  return (
    <Stack direction='row' spacing={4} height={vh(100)} width={'100%'}>
      <AppNavbar />
      <Stack py={8} flex={1} overflow={'hidden auto'}>
        <Stack mx={'auto'} maxWidth={spacing(220)} width={'100%'}>
          <Outlet />
        </Stack>
      </Stack>
    </Stack>
  )
}

export default MainLayout

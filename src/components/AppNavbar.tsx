import { Divider, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

import { config } from '@/config'
import { Icons, Routes } from '@/enums'
import { UiButton, UiIcon } from '@/ui'

const AppNavbar = () => {
  return (
    <Stack spacing={4} py={1}>
      <Link to={Routes.Profiles}>
        <Stack alignItems='center'>
          <img src='/branding/logo.svg' alt={config.APP_NAME} />
        </Stack>
      </Link>
      <Divider />
      <Stack py={6}>
        <Link to={Routes.Profiles}>
          <UiButton component='div' sx={{ p: 3 }}>
            <UiIcon name={Icons.Wallet} size={6} />
          </UiButton>
        </Link>
      </Stack>
    </Stack>
  )
}

export default AppNavbar

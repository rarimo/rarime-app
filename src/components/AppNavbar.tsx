import { Divider, IconButton, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

import { config } from '@/config'
import { Routes } from '@/enums'

const AppNavbar = () => {
  return (
    <Stack spacing={3}>
      <Link to={Routes.Profiles}>
        <Stack alignItems='center'>
          <img src='/branding/logo.svg' alt={config.APP_NAME} />
        </Stack>
      </Link>
      <Divider />
      <Stack py={2}>
        {/* TODO: Add profiles link */}
        <IconButton size='small'>P</IconButton>
      </Stack>
    </Stack>
  )
}

export default AppNavbar

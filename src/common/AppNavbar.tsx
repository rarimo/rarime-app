import { config } from '@config'
import { ButtonProps, Divider, Stack } from '@mui/material'
import { useCallback } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { Icons, Routes } from '@/enums'
import { UiButton, UiIcon } from '@/ui'

const AppNavbar = () => {
  const location = useLocation()

  // FIXME
  const getLinkProps = useCallback(
    (route: Routes): Partial<ButtonProps> => {
      const isRouteActive = location.pathname.includes(route)

      return {
        variant: isRouteActive ? 'contained' : 'text',
        color: isRouteActive ? 'primary' : 'secondary',
      }
    },
    [location?.pathname],
  )

  return (
    <Stack spacing={4} py={1}>
      <NavLink to={Routes.Profiles}>
        <Stack alignItems='center'>
          <img src='/branding/logo.svg' alt={config.APP_NAME} />
        </Stack>
      </NavLink>
      <Divider />

      {/*FIXME: use array.map*/}
      <Stack py={6} gap={6}>
        <NavLink to={Routes.Profiles}>
          <UiButton component='div' sx={{ p: 3 }} {...getLinkProps(Routes.Profiles)}>
            <UiIcon name={Icons.Wallet} size={6} />
          </UiButton>
        </NavLink>

        <NavLink to={Routes.Orgs}>
          <UiButton component='div' sx={{ p: 3 }} {...getLinkProps(Routes.Orgs)}>
            <UiIcon componentName='work' size={6} />
          </UiButton>
        </NavLink>
      </Stack>
    </Stack>
  )
}

export default AppNavbar

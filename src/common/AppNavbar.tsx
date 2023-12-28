import { config } from '@config'
import { ButtonProps, Divider, Stack } from '@mui/material'
import { ReactNode, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { Icons, Routes } from '@/enums'
import { UiButton, UiIcon } from '@/ui'

interface NavbarLinkProps {
  to: Routes
  children: ReactNode
}

const NavbarLink = ({ children, to }: NavbarLinkProps) => {
  const location = useLocation()

  const linkProps = useMemo((): Partial<ButtonProps> => {
    const locationRoot = location.pathname.split('/')[1]

    const isRouteActive = to.includes(locationRoot)

    return {
      variant: isRouteActive ? 'contained' : 'text',
      color: isRouteActive ? 'primary' : 'secondary',
    }
  }, [location.pathname, to])

  return (
    <NavLink to={to}>
      <UiButton component='div' sx={{ p: 3 }} {...linkProps}>
        {children}
      </UiButton>
    </NavLink>
  )
}

const AppNavbar = () => {
  const navbarItems = useMemo(
    () => [
      { route: Routes.Profiles, iconComponent: <UiIcon name={Icons.Wallet} size={6} /> },
      { route: Routes.Orgs, iconComponent: <UiIcon componentName='work' size={6} /> },
    ],
    [],
  )

  return (
    <Stack spacing={4} py={1}>
      <NavLink to={Routes.Profiles}>
        <Stack alignItems='center'>
          <img src='/branding/logo.svg' alt={config.APP_NAME} />
        </Stack>
      </NavLink>
      <Divider />

      <Stack py={6} gap={6}>
        {navbarItems.map(({ route, iconComponent }, idx) => (
          <NavbarLink to={route} key={idx}>
            {iconComponent}
          </NavbarLink>
        ))}
      </Stack>
    </Stack>
  )
}

export default AppNavbar

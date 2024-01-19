import { config } from '@config'
import { Box, Divider, Stack, useTheme } from '@mui/material'
import { ReactNode, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { Icons, RoutePaths } from '@/enums'
import { Transitions } from '@/theme/constants'
import { UiIcon } from '@/ui'

interface NavbarLinkProps {
  to: RoutePaths
  children: ReactNode
}

const NavbarLink = ({ children, to }: NavbarLinkProps) => {
  const location = useLocation()
  const { palette, spacing } = useTheme()

  const isRouteActive = useMemo(() => {
    const locationRoot = location.pathname.split('/')[1]
    return to.includes(locationRoot)
  }, [location.pathname, to])

  return (
    <NavLink to={to}>
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          width: spacing(10),
          height: spacing(10),
          borderRadius: 250,
          backgroundColor: isRouteActive ? palette.additional.pureBlack : 'transparent',
          color: isRouteActive ? palette.primary.main : palette.text.primary,
          transition: Transitions.Default,
          '&:hover': {
            backgroundColor: isRouteActive ? palette.additional.pureBlack : palette.action.hover,
          },
        }}
      >
        {children}
      </Stack>
    </NavLink>
  )
}

const AppNavbar = () => {
  const { palette } = useTheme()

  const navbarItems = useMemo(
    () => [
      { route: RoutePaths.Profiles, iconComponent: <UiIcon name={Icons.Wallet} size={5} /> },
      { route: RoutePaths.Orgs, iconComponent: <UiIcon componentName={'work'} size={5} /> },
    ],
    [],
  )

  return (
    <Stack
      justifyContent={'space-between'}
      py={6}
      px={4}
      borderRight={1}
      borderColor={palette.divider}
    >
      <Stack spacing={4}>
        <NavLink to={RoutePaths.Profiles}>
          <Stack alignItems='center'>
            <Box component={'img'} src={'/branding/logo.svg'} alt={config.APP_NAME} />
          </Stack>
        </NavLink>
        <Divider />
        <Stack spacing={4} p={1}>
          {navbarItems.map(({ route, iconComponent }, idx) => (
            <NavbarLink to={route} key={idx}>
              {iconComponent}
            </NavbarLink>
          ))}
        </Stack>
      </Stack>

      {/* TODO: add account popup */}
      <UiIcon name={Icons.Metamask} size={10} sx={{ px: 1 }} />
    </Stack>
  )
}

export default AppNavbar

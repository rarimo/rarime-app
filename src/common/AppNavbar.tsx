import { Divider, Stack, useTheme } from '@mui/material'
import { ReactNode, useCallback, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { ProfileMenu } from '@/common'
import { Icons, RoutePaths } from '@/enums'
import { useMetamaskZkpSnapContext } from '@/hooks'
import { uiStore, useUiState } from '@/store'
import { Transitions } from '@/theme/constants'
import { UiIcon, UiIconButton } from '@/ui'

interface NavbarLinkProps {
  to: RoutePaths
  children: ReactNode
}

const NavbarLink = ({ children, to }: NavbarLinkProps) => {
  const location = useLocation()
  const { palette, spacing } = useTheme()

  const isRouteActive = useMemo(() => {
    return location.pathname.startsWith(to)
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
  const { paletteMode } = useUiState()
  const { userDid } = useMetamaskZkpSnapContext()

  const navbarItems = useMemo(
    () => [
      { route: RoutePaths.Dashboard, iconComponent: <UiIcon name={Icons.House} size={5} /> },
      {
        route: RoutePaths.Credentials,
        iconComponent: <UiIcon componentName={'layers'} size={6} />,
      },
    ],
    [],
  )

  const togglePaletteMode = useCallback(() => {
    uiStore.setPaletteMode(paletteMode === 'dark' ? 'light' : 'dark')
  }, [paletteMode])

  return (
    <Stack
      justifyContent={'space-between'}
      alignItems={'center'}
      py={6}
      px={4}
      borderRight={1}
      borderColor={palette.divider}
    >
      <Stack spacing={4}>
        <Stack component={NavLink} to={RoutePaths.Dashboard} alignItems={'center'}>
          <UiIcon name={Icons.Rarime} size={10} sx={{ color: palette.text.primary }} />
        </Stack>
        <Divider />
        <Stack spacing={4} p={1}>
          {navbarItems.map(({ route, iconComponent }, idx) => (
            <NavbarLink to={route} key={idx}>
              {iconComponent}
            </NavbarLink>
          ))}
        </Stack>
      </Stack>

      <Stack spacing={4}>
        <UiIconButton onClick={togglePaletteMode}>
          <UiIcon
            componentName={paletteMode === 'dark' ? 'darkModeOutlined' : 'lightModeOutlined'}
            size={5}
          />
        </UiIconButton>
        <ProfileMenu userDid={userDid} />
      </Stack>
    </Stack>
  )
}

export default AppNavbar

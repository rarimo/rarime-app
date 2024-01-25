import { Divider, Stack, useTheme } from '@mui/material'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { ProfileMenu, UserAvatar } from '@/common'
import { Icons, RoutePaths } from '@/enums'
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
  const { paletteMode } = useUiState()
  const [anchorEl, setAnchorEl] = useState<null | EventTarget | undefined>(null)

  const navbarItems = useMemo(
    () => [
      { route: RoutePaths.Profiles, iconComponent: <UiIcon name={Icons.Wallet} size={5} /> },
      { route: RoutePaths.Orgs, iconComponent: <UiIcon componentName={'work'} size={5} /> },
      { route: RoutePaths.UiKit, iconComponent: <UiIcon componentName={'info'} size={5} /> },
    ],
    [],
  )

  const togglePaletteMode = useCallback(() => {
    uiStore.setPaletteMode(paletteMode === 'dark' ? 'light' : 'dark')
  }, [paletteMode])

  const openProfileMenu = (event: Event | undefined) => {
    setAnchorEl(event?.target)
  }
  const closeProfileMenu = () => {
    setAnchorEl(null)
  }

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
        <Stack component={NavLink} to={RoutePaths.Profiles} alignItems={'center'}>
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
        <ProfileMenu anchorEl={anchorEl as HTMLElement} handleClose={closeProfileMenu} />
        <UiIconButton onClick={() => openProfileMenu(event)}>
          <UserAvatar />
        </UiIconButton>
      </Stack>
    </Stack>
  )
}

export default AppNavbar

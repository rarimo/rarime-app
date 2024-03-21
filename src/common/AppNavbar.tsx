import { Divider, IconButton, Stack, useTheme } from '@mui/material'
import { useCallback, useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { ProfileMenu } from '@/common'
import { Icons, RoutePaths } from '@/enums'
import { uiStore, useIdentityState, useUiState } from '@/store'
import { Transitions } from '@/theme/constants'
import { UiIcon } from '@/ui'

interface NavbarLinkProps {
  to: RoutePaths
  icon: Icons
  activeIcon: Icons
}

const NavbarLink = ({ to, icon, activeIcon }: NavbarLinkProps) => {
  const location = useLocation()
  const { palette, spacing } = useTheme()

  const isRouteActive = useMemo(() => {
    return location.pathname.startsWith(to)
  }, [location.pathname, to])

  return (
    <NavLink to={to}>
      <Stack
        alignItems='center'
        justifyContent='center'
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
        <UiIcon name={isRouteActive ? activeIcon : icon} size={5} />
      </Stack>
    </NavLink>
  )
}

const AppNavbar = () => {
  const { palette } = useTheme()
  const { paletteMode } = useUiState()
  const { userDid } = useIdentityState()

  const navbarItems = useMemo(
    () => [
      {
        route: RoutePaths.Dashboard,
        icon: Icons.HouseSimple,
        activeIcon: Icons.HouseSimpleFill,
      },
      {
        route: RoutePaths.Credentials,
        icon: Icons.IdentificationCard,
        activeIcon: Icons.IdentificationCardFill,
      },
      {
        route: RoutePaths.Wallet,
        icon: Icons.Wallet,
        activeIcon: Icons.WalletFilled,
      },
      {
        route: RoutePaths.Rewards,
        icon: Icons.Gift,
        activeIcon: Icons.GiftFill,
      },
    ],
    [],
  )

  const togglePaletteMode = useCallback(() => {
    uiStore.setPaletteMode(paletteMode === 'dark' ? 'light' : 'dark')
  }, [paletteMode])

  return (
    <Stack
      justifyContent='space-between'
      alignItems='center'
      py={6}
      px={4}
      borderRight={1}
      borderColor={palette.divider}
      sx={{ display: { xs: 'none', md: 'flex' } }}
    >
      <Stack spacing={4}>
        <Stack component={NavLink} to={RoutePaths.Dashboard} alignItems='center'>
          <UiIcon name={Icons.Rarime} size={10} sx={{ color: palette.text.primary }} />
        </Stack>
        <Divider />
        <Stack spacing={4} p={1}>
          {navbarItems.map(({ route, icon, activeIcon }, idx) => (
            <NavbarLink key={idx} to={route} icon={icon} activeIcon={activeIcon} />
          ))}
        </Stack>
      </Stack>

      <Stack spacing={4}>
        <IconButton onClick={togglePaletteMode}>
          <UiIcon name={paletteMode === 'dark' ? Icons.Moon : Icons.Sun} size={5} />
        </IconButton>
        <ProfileMenu userDid={userDid} />
      </Stack>
    </Stack>
  )
}

export default AppNavbar

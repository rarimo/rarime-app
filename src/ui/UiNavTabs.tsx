import { Stack, StackProps, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'

import { Transitions } from '@/theme/constants'

interface Props extends StackProps {
  tabs: {
    label: string
    route: string
    isExact?: boolean
  }[]
}

function NavTab({
  to,
  label,
  isExact = false,
  ...rest
}: { label: string; isExact?: boolean } & NavLinkProps) {
  const location = useLocation()
  const { palette, spacing } = useTheme()

  const isRouteActive = useMemo(() => {
    return isExact ? location.pathname === (to as string) : location.pathname.includes(to as string)
  }, [isExact, location.pathname, to])

  return (
    <NavLink {...rest} to={to}>
      <Stack
        alignItems={'center'}
        sx={{
          background: isRouteActive ? palette.background.paper : 'none',
          px: 4,
          py: 2,
          minWidth: spacing(30),
          borderRadius: 25,
          transition: Transitions.Default,
        }}
      >
        <Typography
          variant={'buttonSmall'}
          color={isRouteActive ? palette.text.primary : palette.text.secondary}
        >
          {label}
        </Typography>
      </Stack>
    </NavLink>
  )
}

export default function UiNavTabs({ tabs, ...rest }: Props) {
  return (
    <Stack
      {...rest}
      direction='row'
      justifyContent='center'
      alignItems='center'
      sx={theme => ({
        p: 0.5,
        background: theme.palette.action.active,
        borderRadius: 25,
        overflow: 'hidden',
      })}
    >
      {tabs.map(({ route, label, isExact }, idx) => (
        <NavTab key={idx} to={route} label={label} isExact={isExact} />
      ))}
    </Stack>
  )
}

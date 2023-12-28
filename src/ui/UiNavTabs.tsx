import { ButtonProps, Stack, StackProps } from '@mui/material'
import { useMemo } from 'react'
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'

import UiButton from '@/ui/UiButton'

interface Props extends StackProps {
  tabs: {
    label: string
    route: string
  }[]
}

function NavTab({ to, label, ...rest }: { label: string } & NavLinkProps) {
  const location = useLocation()

  const getLinkProps = useMemo((): Partial<ButtonProps> => {
    const isRouteActive = location.pathname.includes(to as string)

    return {
      variant: isRouteActive ? 'contained' : 'text',
      color: isRouteActive ? 'primary' : 'secondary',
    }
  }, [location.pathname, to])

  return (
    <NavLink {...rest} to={to}>
      <UiButton
        sx={theme => ({
          background: theme.palette.background.default,
          px: 7,
          py: 2,
        })}
        {...getLinkProps}
      >
        {label}
      </UiButton>
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
        background: theme.palette.text.secondary,
        borderRadius: 25,
        overflow: 'hidden',
      })}
      padding={1}
    >
      {tabs.map(({ route, label }, idx) => (
        <NavTab key={idx} to={route} label={label} />
      ))}
    </Stack>
  )
}

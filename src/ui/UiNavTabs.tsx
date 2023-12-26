import { ButtonProps, Stack, StackProps } from '@mui/material'
import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

import UiButton from '@/ui/UiButton'

interface Props extends StackProps {
  tabs: {
    label: string
    route: string
  }[]
}

export default function UiNavTabs({ tabs, ...rest }: Props) {
  const location = useLocation()

  // FIXME
  const getLinkProps = useCallback(
    (route: string): Partial<ButtonProps> => {
      const isRouteActive = location.pathname.includes(route)

      return {
        variant: isRouteActive ? 'contained' : 'text',
        color: isRouteActive ? 'primary' : 'secondary',
      }
    },
    [location?.pathname],
  )

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
      {tabs.map(({ route, label }, index) => (
        <Link key={index} to={route}>
          <UiButton
            sx={theme => ({
              borderRadius: 25,
              background: theme.palette.background.default,
              px: 7,
              py: 2,
            })}
            {...getLinkProps(route)}
          >
            {label}
          </UiButton>
        </Link>
      ))}
    </Stack>
  )
}

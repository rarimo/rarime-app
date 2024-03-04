import { Button, ButtonProps } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'

import { UiIcon } from '@/ui'

interface Props extends ButtonProps {
  to: string
}

export default function BackLink({ to, ...rest }: Props) {
  const location = useLocation()

  return (
    <Button
      component={NavLink}
      to={location.state?.from ?? to}
      variant='text'
      color='secondary'
      size='small'
      startIcon={<UiIcon componentName={'chevronLeft'} size={5} />}
      {...rest}
      sx={{ width: 'fit-content', ...rest.sx }}
    >
      Go back
    </Button>
  )
}

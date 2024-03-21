import { Button, ButtonProps, Stack, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { Icons } from '@/enums'
import { Transitions } from '@/theme/constants'
import { UiIcon } from '@/ui'

interface Props extends ButtonProps {
  appearance?: 'default' | 'primary' | 'danger'
  icon: Icons
}

export default function ActionButton({ appearance = 'default', children, icon, ...rest }: Props) {
  const { palette, spacing } = useTheme()

  const iconWrapperSx = useMemo(() => {
    switch (appearance) {
      case 'primary':
        return {
          bgcolor: palette.additional.pureBlack,
          color: palette.primary.main,
        }
      case 'danger':
        return {
          bgcolor: palette.error.lighter,
          color: palette.error.main,
        }
      default:
        return {
          bgcolor: palette.action.active,
          color: palette.text.primary,
        }
    }
  }, [appearance, palette])

  const iconWrapperHoverSx = useMemo(() => {
    switch (appearance) {
      case 'primary':
        return {
          bgcolor: palette.primary.main,
          color: palette.common.black,
        }
      case 'danger':
        return {
          bgcolor: palette.error.main,
          color: palette.common.white,
        }
      default:
        return {
          bgcolor: palette.action.focus,
        }
    }
  }, [appearance, palette])

  return (
    <Button
      variant='text'
      size='small'
      component={Stack}
      alignItems='center'
      justifyContent='center'
      spacing={2}
      {...rest}
      sx={{
        textAlign: 'center',
        width: 'min-content',
        '&:hover > .MuiStack-root': iconWrapperHoverSx,
      }}
    >
      <Stack
        width={spacing(12)}
        height={spacing(12)}
        justifyContent='center'
        alignItems='center'
        borderRadius='50%'
        sx={{
          ...iconWrapperSx,
          transition: Transitions.Default,
        }}
      >
        <UiIcon size={5} name={icon} />
      </Stack>
      {children}
    </Button>
  )
}

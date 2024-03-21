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
          default: {
            bgcolor: palette.additional.pureBlack,
            color: palette.primary.main,
          },
          hover: {
            bgcolor: palette.primary.main,
            color: palette.common.black,
          },
        }
      case 'danger':
        return {
          default: {
            bgcolor: palette.error.lighter,
            color: palette.error.main,
          },
          hover: {
            bgcolor: palette.error.main,
            color: palette.common.white,
          },
        }
      default:
        return {
          default: {
            bgcolor: palette.action.active,
            color: palette.text.primary,
          },
          hover: {
            bgcolor: palette.action.focus,
          },
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
        '&:hover > .MuiStack-root': iconWrapperSx.hover,
      }}
    >
      <Stack
        width={spacing(12)}
        height={spacing(12)}
        justifyContent='center'
        alignItems='center'
        borderRadius='50%'
        sx={{
          ...iconWrapperSx.default,
          transition: Transitions.Default,
        }}
      >
        <UiIcon size={5} name={icon} />
      </Stack>
      {children}
    </Button>
  )
}

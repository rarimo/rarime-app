import { Stack, StackProps, Typography, useTheme } from '@mui/material'
import { ReactNode, useMemo } from 'react'

import { UiIcon } from '@/ui/index'

type Props = StackProps & {
  icon?: ReactNode
  message: string
  severity: 'error' | 'info' | 'success' | 'warning'
}

export default function UiInfoChip({ icon, message, severity, ...rest }: Props) {
  const { palette, spacing } = useTheme()

  const stackStyles = useMemo(
    () =>
      ({
        error: {
          background: palette.error.lighter,
          color: palette.error.darker,
        },
        info: {
          background: palette.warning.lighter,
          color: palette.warning.darker,
        },
        success: {
          background: palette.success.lighter,
          color: palette.success.darker,
        },
        warning: {
          background: palette.warning.lighter,
          color: palette.warning.darker,
        },
      }[severity]),
    [
      palette.error.darker,
      palette.error.lighter,
      palette.success.darker,
      palette.success.lighter,
      palette.warning.darker,
      palette.warning.lighter,
      severity,
    ],
  )

  const chipIcon = useMemo(
    () =>
      icon ||
      {
        error: <UiIcon componentName='infoOutlined' sx={{ color: 'inherit' }} />,
        info: <UiIcon componentName='infoOutlined' sx={{ color: 'inherit' }} />,
        success: <UiIcon componentName='infoOutlined' sx={{ color: 'inherit' }} />,
        warning: <UiIcon componentName='infoOutlined' sx={{ color: 'inherit' }} />,
      }[severity],
    [icon, severity],
  )

  return (
    <Stack
      {...rest}
      sx={{ ...stackStyles }}
      direction='row'
      alignItems='center'
      spacing={2}
      p={spacing(2)}
      borderRadius={spacing(2)}
    >
      {chipIcon}
      <Typography variant='body4' sx={{ color: 'inherit' }}>
        {message}
      </Typography>
    </Stack>
  )
}

import {
  Alert,
  AlertColor,
  AlertTitle,
  Snackbar,
  SnackbarOrigin,
  Theme,
  useTheme,
} from '@mui/material'
import { SyntheticEvent, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { BusEvents } from '@/enums'
import { UiIcon } from '@/ui'

function getIconBySeverity(theme: Theme, severity: AlertColor) {
  const color = theme.palette[severity].dark
  const iconProps = {
    'aria-hidden': true,
    sx: { color },
  }

  const icon = {
    error: <UiIcon componentName={'errorOutline'} {...iconProps} />,
    info: <UiIcon componentName={'info'} {...iconProps} />,
    success: <UiIcon componentName={'check'} {...iconProps} />,
    warning: <UiIcon componentName={'warningAmber'} {...iconProps} />,
  }[severity]

  return { icon, color }
}

export default function UiSnackbarInfo({
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  autoHideDuration = 5000,
  isOpened,
  message,
  close,
  severity = 'info',
}: {
  anchorOrigin?: SnackbarOrigin
  autoHideDuration?: number
  isOpened: boolean
  message: string
  close?: () => void
  severity: AlertColor
}) {
  const { t } = useTranslation()
  const theme = useTheme()

  const { icon, color } = getIconBySeverity(theme, severity || 'info')

  const onClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    close && close()
  }

  const defaultTitles = useMemo(
    () => ({
      [BusEvents.success]: t('notifications.default-title-success'),
      [BusEvents.error]: t('notifications.default-title-error'),
      [BusEvents.warning]: t('notifications.default-title-warning'),
      [BusEvents.info]: t('notifications.default-title-info'),
    }),
    [t],
  )

  return (
    <Snackbar
      {...(anchorOrigin && { anchorOrigin })}
      {...(autoHideDuration && { autoHideDuration })}
      {...(close && { onClose })}
      open={isOpened}
      sx={{
        top: 2.5,
        right: 2,
        minWidth: { xs: '80vw', md: 400 },
        maxWidth: { xs: '80vw', md: 400 },
        '& > .MuiPaper-root': {
          borderColor: color,
        },
      }}
    >
      <Alert
        {...(close && { onClose })}
        sx={{
          width: '100%',
          '& > .MuiAlert-message': {
            wordBreak: 'break-word',
          },
        }}
        icon={icon}
        severity={severity}
        elevation={6}
      >
        <AlertTitle>{defaultTitles[severity]}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  )
}

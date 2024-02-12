import { SnackbarProvider, useSnackbar } from 'notistack'
import { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { BusEvents, ICON_COMPONENTS, Icons } from '@/enums'
import { bus } from '@/helpers'

import { DefaultToast } from './toasts'

const STATUS_MESSAGE_AUTO_HIDE_DURATION = 30 * 1000

type ToastPayload = {
  title?: string
  message?: string
  icon?: Icons | keyof typeof ICON_COMPONENTS
  messageType?: BusEvents
}

declare module 'notistack' {
  interface VariantOverrides {
    defaultToast: ToastPayload
  }
}

function ToastsManagerController({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()

  const defaultTitles = useMemo(
    () => ({
      [BusEvents.success]: t('notifications.default-title-success'),
      [BusEvents.error]: t('notifications.default-title-error'),
      [BusEvents.warning]: t('notifications.default-title-warning'),
      [BusEvents.info]: t('notifications.default-title-info'),
    }),
    [t],
  )

  const defaultMessages = useMemo(
    () => ({
      [BusEvents.success]: t('notifications.default-message-success'),
      [BusEvents.error]: t('notifications.default-message-error'),
      [BusEvents.warning]: t('notifications.default-message-warning'),
      [BusEvents.info]: t('notifications.default-message-info'),
    }),
    [t],
  )

  const defaultIcons = useMemo<Record<BusEvents, Icons | keyof typeof ICON_COMPONENTS>>(
    () => ({
      [BusEvents.success]: 'check',
      [BusEvents.error]: 'errorOutline',
      [BusEvents.warning]: 'warningAmber',
      [BusEvents.info]: 'info',
    }),
    [],
  )

  const showToast = useCallback(
    (messageType = BusEvents.info, payload: ToastPayload) => {
      const title = payload?.title || defaultTitles[messageType]
      const message = payload?.message || defaultMessages[messageType]
      const icon = payload?.icon || defaultIcons[messageType]

      enqueueSnackbar(message, {
        variant: 'defaultToast',

        messageType,
        title,
        icon,
      })
    },
    [defaultTitles, defaultMessages, defaultIcons, enqueueSnackbar],
  )

  const showSuccessToast = useCallback(
    (payload?: unknown) => showToast(BusEvents.success, payload as ToastPayload),
    [showToast],
  )

  const showWarningToast = useCallback(
    (payload?: unknown) => showToast(BusEvents.warning, payload as ToastPayload),
    [showToast],
  )
  const showErrorToast = useCallback(
    (payload?: unknown) => showToast(BusEvents.error, payload as ToastPayload),
    [showToast],
  )
  const showInfoToast = useCallback(
    (payload?: unknown) => showToast(BusEvents.info, payload as ToastPayload),
    [showToast],
  )

  useEffect(() => {
    bus.on(BusEvents.success, showSuccessToast)
    bus.on(BusEvents.warning, showWarningToast)
    bus.on(BusEvents.error, showErrorToast)
    bus.on(BusEvents.info, showInfoToast)

    return () => {
      bus.off(BusEvents.success, showSuccessToast)
      bus.off(BusEvents.warning, showWarningToast)
      bus.off(BusEvents.error, showErrorToast)
      bus.off(BusEvents.info, showInfoToast)
    }
  }, [showErrorToast, showInfoToast, showSuccessToast, showWarningToast])

  return children
}

export default function ToastsManager({ children }: { children: ReactNode }) {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={STATUS_MESSAGE_AUTO_HIDE_DURATION}
      Components={{
        defaultToast: DefaultToast,
      }}
      maxSnack={10}
    >
      <ToastsManagerController>{children}</ToastsManagerController>
    </SnackbarProvider>
  )
}

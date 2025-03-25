import { SnackbarProvider, useSnackbar } from 'notistack'
import { PropsWithChildren, ReactElement, useCallback, useEffect } from 'react'

import AppToast from '@/components/AppToast'
import { Icons } from '@/constants/icons'
import { EmitterEvent, eventEmitter } from '@/services/event-emitter'

const STATUS_MESSAGE_AUTO_HIDE_DURATION = 5 * 1000

const titlesMap: Record<EmitterEvent, string> = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Info',
}

const iconsMap: Record<EmitterEvent, Icons> = {
  success: Icons.Check,
  error: Icons.Warning,
  warning: Icons.Warning,
  info: Icons.Info,
}

declare module 'notistack' {
  interface VariantOverrides {
    custom: {
      type: EmitterEvent
      title: string
      message: string
      icon: Icons
    }
  }
}

export default function ToastsProvider({ children }: { children: ReactElement }) {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={STATUS_MESSAGE_AUTO_HIDE_DURATION}
      Components={{ custom: AppToast }}
      maxSnack={10}
    >
      <SnackbarController>{children}</SnackbarController>
    </SnackbarProvider>
  )
}

function SnackbarController({ children }: PropsWithChildren) {
  const { enqueueSnackbar } = useSnackbar()

  const showToast = useCallback(
    (type: EmitterEvent, message: string) => {
      enqueueSnackbar(message, {
        variant: 'custom',
        type,
        title: titlesMap[type],
        message,
        icon: iconsMap[type],
      })
    },
    [enqueueSnackbar],
  )

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    eventEmitter.on('success', message => showToast('success', message), { signal })
    eventEmitter.on('warning', message => showToast('warning', message), { signal })
    eventEmitter.on('error', message => showToast('error', message), { signal })
    eventEmitter.on('info', message => showToast('info', message), { signal })

    return () => controller.abort()
  }, [showToast])

  return children
}

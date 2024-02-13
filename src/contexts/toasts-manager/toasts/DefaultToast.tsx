import { Alert, AlertColor, AlertTitle, Typography } from '@mui/material'
import { CustomContentProps, SnackbarContent, useSnackbar } from 'notistack'
import { forwardRef, useMemo } from 'react'

import { BusEvents, ICON_COMPONENTS, Icons } from '@/enums'
import { UiIcon } from '@/ui'

interface Props extends CustomContentProps {
  messageType: BusEvents

  title: string
  message: string
  icon: Icons | keyof typeof ICON_COMPONENTS
}

const DefaultToast = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { message, icon, title, id } = props

  const { closeSnackbar } = useSnackbar()

  const severityMap = useMemo<Record<BusEvents, AlertColor>>(
    () => ({
      [BusEvents.success]: 'success',
      [BusEvents.error]: 'error',
      [BusEvents.warning]: 'warning',
      [BusEvents.info]: 'info',
    }),
    [],
  )

  const iconComponent = useMemo(() => {
    if (!icon) return

    return Object.values(Icons).includes(icon as Icons) ? (
      <UiIcon name={icon as Icons} />
    ) : (
      <UiIcon componentName={icon as keyof typeof ICON_COMPONENTS} />
    )
  }, [icon])

  return (
    <SnackbarContent ref={ref} role='alert'>
      <Alert
        icon={iconComponent}
        severity={severityMap[props.messageType]}
        onClose={() => closeSnackbar(id)}
      >
        <AlertTitle>{title}</AlertTitle>
        <Typography variant={'body4'}>{message}</Typography>
      </Alert>
    </SnackbarContent>
  )
})

DefaultToast.displayName = 'DefaultToast'

export default DefaultToast

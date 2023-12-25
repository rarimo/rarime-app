import { Alert, AlertColor, AlertTitle } from '@mui/material'
import { CustomContentProps, SnackbarContent, useSnackbar } from 'notistack'
import { forwardRef, useMemo } from 'react'

import { Icons, ICONS_COMPONENTS } from '@/enums'
import { UiIcon } from '@/ui'

interface Props extends CustomContentProps {
  severity: AlertColor

  title: string
  message: string
  icon: Icons | keyof typeof ICONS_COMPONENTS
}

const DefaultToast = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { severity, message, icon, title, id } = props

  const { closeSnackbar } = useSnackbar()

  const iconComponent = useMemo(() => {
    if (!icon) return

    return Object.values(Icons).includes(icon as Icons) ? (
      <UiIcon name={icon as Icons} />
    ) : (
      <UiIcon componentName={icon as keyof typeof ICONS_COMPONENTS} />
    )
  }, [icon])

  return (
    <SnackbarContent ref={ref} role='alert'>
      <Alert icon={iconComponent} severity={severity} onClose={() => closeSnackbar(id)}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </SnackbarContent>
  )
})

DefaultToast.displayName = 'DefaultToast'

export default DefaultToast

import { Alert, AlertTitle, Typography, useTheme } from '@mui/material'
import { CustomContentProps, SnackbarContent, useSnackbar } from 'notistack'
import { forwardRef } from 'react'

import { Icons } from '@/constants/icons'
import { EmitterEvent } from '@/services/event-emitter'
import { UiIcon } from '@/ui'

interface Props extends CustomContentProps {
  type: EmitterEvent
  title: string
  message: string
  icon: Icons
}

const AppToast = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { message, icon, title, id } = props
  const { spacing } = useTheme()

  const { closeSnackbar } = useSnackbar()

  return (
    <SnackbarContent ref={ref} role='alert'>
      <Alert
        icon={<UiIcon name={icon} />}
        severity={props.type}
        sx={{ maxWidth: spacing(100) }}
        onClose={() => closeSnackbar(id)}
      >
        <AlertTitle>{title}</AlertTitle>
        <Typography variant='body4'>{message}</Typography>
      </Alert>
    </SnackbarContent>
  )
})

AppToast.displayName = 'AppToast'

export default AppToast

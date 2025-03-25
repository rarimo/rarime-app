import { Alert, AlertTitle, Typography, useTheme } from '@mui/material'
import { CustomContentProps, SnackbarContent, useSnackbar } from 'notistack'
import { Ref } from 'react'

import { Icons } from '@/constants/icons'
import { EmitterEvent } from '@/services/event-emitter'
import { UiIcon } from '@/ui'

interface Props extends CustomContentProps {
  type: EmitterEvent
  title: string
  message: string
  icon: Icons
  ref: Ref<HTMLDivElement>
}

export default function AppToast({ type, message, icon, title, id, ref }: Props) {
  const { spacing } = useTheme()
  const { closeSnackbar } = useSnackbar()

  return (
    <SnackbarContent ref={ref} role='alert'>
      <Alert
        icon={<UiIcon name={icon} />}
        severity={type}
        sx={{ maxWidth: spacing(100) }}
        onClose={() => closeSnackbar(id)}
      >
        <AlertTitle>{title}</AlertTitle>
        <Typography variant='body4'>{message}</Typography>
      </Alert>
    </SnackbarContent>
  )
}

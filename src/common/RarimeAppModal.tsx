import { Dialog, DialogProps, Divider, Stack, Typography, useTheme } from '@mui/material'
import { QRCode } from 'react-qrcode-logo'

import { RoutePaths } from '@/enums'
import { UiDialogContent, UiDialogTitle } from '@/ui'

import RarimeAppBadges from './RarimeAppBadges'

export default function RarimeAppModal(props: DialogProps) {
  const { palette, spacing } = useTheme()

  return (
    <Dialog
      {...props}
      PaperProps={{
        ...props.PaperProps,
        sx: { width: spacing(110) },
      }}
    >
      <UiDialogTitle onClose={props.onClose}>Rarime App</UiDialogTitle>
      <UiDialogContent>
        <Stack spacing={6}>
          <Stack spacing={4}>
            <Stack
              justifyContent='center'
              alignItems='center'
              width={spacing(45)}
              height={spacing(45)}
              mx='auto'
              borderRadius={4}
              border={1}
              borderColor={palette.divider}
            >
              <QRCode value={`https://app.rarime.com` + RoutePaths.DownloadApp} size={140} />
            </Stack>
            <Typography variant='body3' color={palette.text.secondary}>
              Scan this code with your phone to download Rarime app
            </Typography>
          </Stack>
          <Divider />
          <RarimeAppBadges justifyContent='center' />
        </Stack>
      </UiDialogContent>
    </Dialog>
  )
}

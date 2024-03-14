import { Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import { ComponentProps } from 'react'
import { QRCode } from 'react-qrcode-logo'

import { useWalletState } from '@/store'
import { toRem } from '@/theme/helpers'
import { UiBasicModal, UiCopyField, UiIcon, UiInfoAlert } from '@/ui'

type Props = ComponentProps<typeof UiBasicModal>

export default function ReceiveModal({ ...rest }: Props) {
  const { palette } = useTheme()

  const { address } = useWalletState()

  return (
    <UiBasicModal {...rest}>
      <Stack>
        <Stack direction='row' alignItems='center' justifyContent='space-between' p={5}>
          <Typography variant='h6'>Receive</Typography>

          <Button variant='text' onClick={rest.onClose}>
            <UiIcon componentName='close' sx={{ color: palette.text.secondary }} />
          </Button>
        </Stack>

        <Divider />

        <Stack p={5} spacing={5}>
          <UiInfoAlert severity='success' message='Informational message' />

          <Stack alignSelf='center' border={`${toRem(4)} solid ${palette.common.black}`}>
            <QRCode
              logoImage='/branding/logo.svg'
              logoPadding={5}
              logoOpacity={1}
              removeQrCodeBehindLogo
              value={address}
            />
          </Stack>

          <UiCopyField label='Deposit Address' value={address} />
        </Stack>
      </Stack>
    </UiBasicModal>
  )
}

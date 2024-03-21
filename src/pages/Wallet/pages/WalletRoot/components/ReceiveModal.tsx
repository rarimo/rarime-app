import { Dialog, DialogProps, Stack, useTheme } from '@mui/material'
import { QRCode } from 'react-qrcode-logo'

import { useWalletState } from '@/store'
import { toRem } from '@/theme/helpers'
import { UiCopyField, UiDialogContent, UiDialogTitle, UiInfoAlert } from '@/ui'

type Props = DialogProps

export default function ReceiveModal({ ...rest }: Props) {
  const { palette } = useTheme()

  const { address } = useWalletState()

  return (
    <Dialog {...rest}>
      <UiDialogTitle onClose={rest.onClose}>Receive</UiDialogTitle>

      <UiDialogContent>
        <Stack spacing={5}>
          <UiInfoAlert severity='warning' message='STUB: Informational message' />

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
      </UiDialogContent>
    </Dialog>
  )
}

import { Dialog, DialogProps, Stack, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { QRCode } from 'react-qrcode-logo'

import { useWalletState } from '@/store'
import { toRem } from '@/theme/helpers'
import { UiCopyField, UiDialogContent, UiDialogTitle, UiInfoAlert } from '@/ui'

type Props = DialogProps

export default function ReceiveModal({ ...rest }: Props) {
  const { palette } = useTheme()
  const { address, balances } = useWalletState()

  const mainBalance = useMemo(() => balances?.[0], [balances])

  return (
    <Dialog {...rest}>
      <UiDialogTitle onClose={rest.onClose}>Receive {mainBalance?.denom}</UiDialogTitle>

      <UiDialogContent>
        <Stack spacing={5}>
          <UiInfoAlert severity='warning' message='STUB: Informational message' />

          <Stack
            alignSelf='center'
            border={`${toRem(6)} solid ${palette.common.black}`}
            p={1}
            borderRadius={2}
          >
            <QRCode
              logoImage='/branding/logo.svg'
              logoPadding={5}
              logoOpacity={1}
              removeQrCodeBehindLogo
              value={address}
              size={150}
            />
          </Stack>

          <UiCopyField label='Deposit Address' value={address} />
        </Stack>
      </UiDialogContent>
    </Dialog>
  )
}

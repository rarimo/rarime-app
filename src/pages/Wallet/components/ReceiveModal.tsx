import { Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { QRCode } from 'react-qrcode-logo'

import { useWalletState } from '@/store'
import { toRem } from '@/theme/helpers'
import { UiBasicModal, UiCopyField, UiIcon, UiInfoChip } from '@/ui'

export default function ReceiveModal() {
  const { palette } = useTheme()

  const [isModalShown, setIsModalShown] = useState(false)

  const { address } = useWalletState()

  return (
    <>
      <Button
        color='secondary'
        startIcon={<UiIcon componentName='arrowDownward' />}
        onClick={() => setIsModalShown(true)}
      >
        Receive
      </Button>

      <UiBasicModal open={isModalShown} onClose={() => setIsModalShown(false)}>
        <Stack>
          <Stack direction='row' alignItems='center' justifyContent='space-between' p={5}>
            <Typography variant='h6'>Receive</Typography>

            <Button variant='text' onClick={() => setIsModalShown(false)}>
              <UiIcon componentName='close' sx={{ color: palette.text.secondary }} />
            </Button>
          </Stack>

          <Divider />

          <Stack p={5} spacing={5}>
            <UiInfoChip severity='warning' message='Informational message' />

            <Stack alignSelf='center' border={`${toRem(4)} solid ${palette.common.black}`}>
              <QRCode
                logoImage='/branding/logo.svg'
                logoPadding={5}
                logoOpacity={1}
                removeQrCodeBehindLogo={true}
                value={address}
              />
            </Stack>

            <UiCopyField label='Deposit Address' value={address} />
          </Stack>
        </Stack>
      </UiBasicModal>
    </>
  )
}

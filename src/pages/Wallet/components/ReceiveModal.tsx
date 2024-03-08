import { Button, Divider, Paper, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { QRCode } from 'react-qrcode-logo'

import { useWalletState } from '@/store'
import { UiCopyField, UiIcon, UiModal } from '@/ui'

export default function ReceiveModal() {
  const { palette, spacing } = useTheme()

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

      <UiModal open={isModalShown} onClose={() => setIsModalShown(false)}>
        <Paper
          sx={theme => ({
            overflow: 'hidden',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            p: 0,
          })}
        >
          <Stack spacing={5}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' p={5} pb={0}>
              <Typography variant='h6'>Receive</Typography>

              <Button variant='text' onClick={() => setIsModalShown(false)}>
                <UiIcon componentName='close' sx={{ color: palette.text.secondary }} />
              </Button>
            </Stack>

            <Divider />

            <Stack
              alignSelf='center'
              sx={{
                borderWidth: spacing(1),
                borderColor: palette.common.black,
                borderStyle: 'solid',
              }}
            >
              <QRCode
                logoImage='/branding/logo.svg'
                logoPadding={5}
                logoOpacity={1}
                removeQrCodeBehindLogo={true}
                value={address}
              />
            </Stack>

            <Stack p={5} alignItems='center' spacing={5}>
              <UiCopyField label='Deposit Address' value={address} />
            </Stack>
          </Stack>
        </Paper>
      </UiModal>
    </>
  )
}

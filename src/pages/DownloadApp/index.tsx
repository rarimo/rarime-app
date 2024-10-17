import { IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'
import { QRCode } from 'react-qrcode-logo'
import { useSearchParams } from 'react-router-dom'

import { RarimeAppBadges } from '@/common'
import { Icons } from '@/enums'
import { isMobile } from '@/helpers'
import { useCopyToClipboard } from '@/hooks'
import { UiIcon } from '@/ui'

type Props = {
  extCode?: string
}

export default function DownloadApp({ extCode }: Props) {
  const { palette } = useTheme()
  const [searchParams] = useSearchParams()
  const { isCopied, copy } = useCopyToClipboard()

  const code = extCode || searchParams.get('code')

  return (
    <Paper
      component={Stack}
      justifyContent='center'
      alignItems='center'
      gap={4}
      sx={{ borderRadius: 2 }}
    >
      {!isMobile() && (
        <QRCode
          logoImage='/branding/logo.svg'
          logoPadding={5}
          logoOpacity={1}
          removeQrCodeBehindLogo
          value={location.href}
          size={150}
        />
      )}
      <Typography variant='subtitle2'>Download RariMe App</Typography>
      <RarimeAppBadges spacing={4} />
      <Stack gap={2}>
        <Typography variant='body3'>1. Download RariMe app on your phone</Typography>
        <Typography variant='body3'>2. Open the app and create your account</Typography>
        {code && (
          <Typography variant='body3'>3. Join rewards program by entering the code</Typography>
        )}
      </Stack>
      {code && (
        <Stack spacing={2} alignItems='center'>
          <Stack
            width='100%'
            direction='row'
            gap={2}
            justifyContent='center'
            p={3}
            bgcolor={palette.action.active}
            border={2}
            borderColor={palette.divider}
            borderRadius={2}
          >
            <Typography
              variant='subtitle2'
              color={palette.text.primary}
              letterSpacing={3}
              textAlign='center'
            >
              {code}
            </Typography>
            <IconButton color={isCopied ? 'success' : 'primary'} onClick={() => copy(code)}>
              <UiIcon name={isCopied ? Icons.Check : Icons.CopySimple} size={5} />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Paper>
  )
}

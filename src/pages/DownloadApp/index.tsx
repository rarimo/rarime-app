import { CircularProgress, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { useSearchParams } from 'react-router-dom'

import RarimeAppBadges from '@/components/RarimeAppBadges'
import { config } from '@/config'
import { isMobile } from '@/utils/device'

type Props = {
  extCode?: string
}

export default function DownloadApp({ extCode }: Props) {
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)

  const code = extCode || searchParams.get('code') || searchParams.get('deep_link_value')

  useEffect(() => {
    if (code) {
      window.location.href = `${config.DEFERRED_DEEP_LINK}?deep_link_value=${code}`
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [code])

  return loading && code ? (
    <Stack alignItems='center' justifyContent='center' flex={1}>
      <CircularProgress color='secondary' />
    </Stack>
  ) : (
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
      </Stack>
    </Paper>
  )
}

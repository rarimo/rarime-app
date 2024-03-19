import { Paper, Stack, Typography, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { RarimeAppBadges } from '@/common'
import { config } from '@/config'
import { RoutePaths } from '@/enums'
import { isAndroid, isIos, isMobile } from '@/helpers'

export default function DownloadApp() {
  const { palette } = useTheme()

  useEffect(() => {
    if (isIos() && config.APP_STORE_APP_LINK) {
      location.replace(config.APP_STORE_APP_LINK)
    }
    if (isAndroid() && config.GOOGLE_PLAY_APP_LINK) {
      location.replace(config.GOOGLE_PLAY_APP_LINK)
    }
  }, [])

  return isMobile() ? (
    <Paper component={Stack} spacing={6} sx={{ borderRadius: 2 }}>
      <Stack spacing={1}>
        <Typography variant='subtitle2'>Download Rarime App</Typography>
        <Typography variant='body3' color={palette.text.secondary}>
          Manage your identity credentials, generate Zero-Knowledge Proofs and share without
          exposing personal data
        </Typography>
      </Stack>
      <RarimeAppBadges spacing={4} />
    </Paper>
  ) : (
    <Navigate to={RoutePaths.Dashboard} replace />
  )
}

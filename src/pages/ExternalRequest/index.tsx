import { Paper, Stack, Typography } from '@mui/material'
import { QRCode } from 'react-qrcode-logo'
import { useLocation } from 'react-router-dom'

import RarimeAppBadges from '@/components/RarimeAppBadges'
import { isMobile } from '@/utils/device'

export default function ExternalRequest() {
  const location = useLocation()

  return (
    <Paper component={Stack} justifyContent='center' alignItems='center' gap={4}>
      <Typography variant='h6'>Scan with RariMe App</Typography>
      {!isMobile() && <QRCode value={`rarime://external${location.search}`} size={200} />}
      <RarimeAppBadges spacing={4} />
    </Paper>
  )
}

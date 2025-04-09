import { Button, Divider, Link, Stack, Typography, useTheme } from '@mui/material'
import { QRCode } from 'react-qrcode-logo'

import StepView from './StepView'

export default function QrCodeStep({ link }: { link: string }) {
  const { palette } = useTheme()

  return (
    <StepView title='Step 2/3' subtitle='Scan QR code with RariMe app and generate proof'>
      <Stack spacing={4} alignItems='center'>
        <QRCode size={240} value={link} />
        <Stack direction='row' spacing={2} alignItems='center' width='100%'>
          <Divider sx={{ flex: 1 }} />
          <Typography variant='body3' color={palette.text.secondary}>
            OR
          </Typography>
          <Divider sx={{ flex: 1 }} />
        </Stack>
        <Button component={Link} color='primary' href={link} fullWidth>
          Open in RariMe app
        </Button>
        <Typography variant='body4' color={palette.text.secondary}>
          Waiting for verification...
        </Typography>
      </Stack>
    </StepView>
  )
}

import { Button, Link, List, Stack, Typography, useTheme } from '@mui/material'

import StepView from './StepView'

export default function IntroStep({ onStart }: { onStart: () => void }) {
  const { palette } = useTheme()

  return (
    <StepView title='RariMe Proof Requests' subtitle='Request Proof of Passport'>
      <Stack spacing={8}>
        <Stack spacing={1}>
          <Typography variant='body3' color={palette.text.primary}>
            The system contains the following components:
          </Typography>
          <List sx={{ listStyleType: 'disc', pl: 4 }}>
            <Typography variant='body3' color={palette.text.primary} component='li'>
              <strong>3rd Party Mobile Apps and Backend:</strong> external system that integrates
              the Proof of Passport
            </Typography>
            <Typography variant='body3' color={palette.text.primary} component='li'>
              <strong>RariMe App:</strong> mobile app that generates the proofs
            </Typography>
            <Typography variant='body3' color={palette.text.primary} component='li'>
              <strong>Verificator-svc:</strong> a service that incapsulates ZK proof verification.
              Self-hosted by the 3rd party.
            </Typography>
          </List>
        </Stack>
        <Stack spacing={2}>
          <Button onClick={onStart}>Start Demo</Button>
          <Button
            color='secondary'
            component={Link}
            href='https://rarimo.notion.site/Requesting-ZK-Passport-proofs-dc43d1102e104d008e0d1c7db5326286?pvs=25'
            target='_blank'
          >
            Read documentation
          </Button>
        </Stack>
      </Stack>
    </StepView>
  )
}

import { Button, Stack, StackProps, Typography, useTheme } from '@mui/material'

import { Illustrations } from '@/enums'
import { UiIllustration } from '@/ui'

interface Props extends StackProps {
  nextStepCb: () => void
}

export default function RegisterIntro({ nextStepCb, ...rest }: Props) {
  const { palette, typography, spacing } = useTheme()
  return (
    <Stack
      direction='row'
      justifyContent='center'
      spacing={16}
      py={18}
      px={6}
      mt={6}
      borderRadius={4}
      bgcolor={palette.background.light}
      {...rest}
    >
      <Stack>
        <Typography variant='h4'>Register</Typography>
        <Typography variant='body3' color={palette.text.secondary} mt={3}>
          Create your company profile
        </Typography>
        <Stack my={6} spacing={3}>
          <Stack
            component='ol'
            paddingInlineStart={5}
            sx={{ '& li::marker': typography.subtitle4 }}
            spacing={3}
          >
            <Typography component='li'>Enter your company details</Typography>
            <Typography component='li'>Verify domain</Typography>
            <Typography component='li'>Create & Manage Credentials</Typography>
          </Stack>
        </Stack>
        <Button onClick={nextStepCb} sx={{ width: spacing(93) }}>
          Let’s Start
        </Button>
      </Stack>
      <Stack p={11}>
        <UiIllustration name={Illustrations.RegistrationIntro} size={60} />
      </Stack>
    </Stack>
  )
}

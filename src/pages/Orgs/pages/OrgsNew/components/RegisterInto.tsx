import { Stack, StackProps, Typography, useTheme } from '@mui/material'

import { Icons } from '@/enums'
import { UiButton, UiIcon } from '@/ui'

interface Props extends StackProps {
  nextStepCb: () => void
}

export default function RegisterInto({ nextStepCb, ...rest }: Props) {
  const { palette, typography, spacing } = useTheme()
  return (
    <Stack
      direction={'row'}
      justifyContent={'center'}
      spacing={16}
      py={18}
      px={6}
      mt={6}
      borderRadius={4}
      bgcolor={palette.background.light}
      {...rest}
    >
      <Stack>
        <Typography variant={'h4'}>Register</Typography>
        <Typography variant={'body3'} color={palette.text.secondary} mt={3}>
          Create your company profile
        </Typography>
        <Stack
          my={6}
          spacing={3}
          sx={{
            '& ol': {
              ...typography.subtitle4,
              paddingInlineStart: 5,
              '& li': {
                pb: 3,
              },
            },
          }}
        >
          <ol>
            <li>
              <Typography ml={3}>Enter your company details</Typography>
            </li>
            <li>
              <Typography ml={3}>Verify domain</Typography>
            </li>
            <li>
              <Typography ml={3}>Create & Manage Credentials</Typography>
            </li>
          </ol>
        </Stack>
        <UiButton onClick={nextStepCb} sx={{ width: spacing(93) }}>
          Let’s Start
        </UiButton>
      </Stack>
      <Stack p={11}>
        <UiIcon name={Icons.RegistrationIntoBg} size={60} />
      </Stack>
    </Stack>
  )
}

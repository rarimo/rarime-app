import { Stack, StackProps } from '@mui/material'

import { UiButton } from '@/ui'

interface Props extends StackProps {
  back: () => void
}

export default function VerifyForm({ back, ...rest }: Props) {
  return (
    <Stack {...rest}>
      VerifyForm
      <UiButton onClick={back}>Back</UiButton>
    </Stack>
  )
}

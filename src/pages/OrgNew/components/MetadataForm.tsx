import { Stack, StackProps } from '@mui/material'

import { UiButton } from '@/ui'

interface Props extends StackProps {
  next: () => void
}

export default function MetadataForm({ next, ...rest }: Props) {
  return (
    <Stack {...rest}>
      MetadataForm
      <UiButton onClick={next}>Next</UiButton>
    </Stack>
  )
}

import { alpha, Paper, Stack, Typography, useTheme } from '@mui/material'

import { useCopyToClipboard } from '@/hooks'
import { UiIcon, UiIconButton } from '@/ui/index'

type Props = {
  label: string
  value: string
}

export default function UiCopyField({ label, value }: Props) {
  const { palette } = useTheme()

  const { copy, isCopied } = useCopyToClipboard()

  return (
    <Stack spacing={2}>
      <Typography variant='subtitle4'>{label}</Typography>

      <Paper sx={{ py: 3.5, px: 4, background: alpha(palette.common.black, 0.05), border: 0 }}>
        <Stack direction='row' spacing={4}>
          <Typography>{value}</Typography>
          <UiIconButton onClick={async () => copy(value)}>
            <UiIcon
              componentName={isCopied ? 'check' : 'contentCopy'}
              sx={{ color: palette.text.secondary }}
            />
          </UiIconButton>
        </Stack>
      </Paper>
    </Stack>
  )
}
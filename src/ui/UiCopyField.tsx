import { IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'

import { Icons } from '@/enums'
import { useCopyToClipboard } from '@/hooks'
import { UiIcon } from '@/ui/index'

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

      <Paper sx={{ py: 3.5, px: 4, background: palette.action.disabled, border: 0 }}>
        <Stack direction='row' spacing={4}>
          <Typography>{value}</Typography>
          <IconButton onClick={() => copy(value)}>
            <UiIcon
              name={isCopied ? Icons.Check : Icons.CopySimple}
              sx={{ color: palette.text.secondary }}
            />
          </IconButton>
        </Stack>
      </Paper>
    </Stack>
  )
}

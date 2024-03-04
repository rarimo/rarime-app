import { Stack, Typography, useTheme } from '@mui/material'

import { Icons } from '@/enums'
import { UiIcon } from '@/ui'

interface Props {
  reward: number
  finished?: boolean
}

export default function RewardChip({ reward, finished }: Props) {
  const { palette } = useTheme()

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={1}
      px={1.5}
      py={0.5}
      borderRadius={12}
      bgcolor={finished ? palette.success.lighter : palette.warning.light}
      color={finished ? palette.success.dark : palette.text.primary}
    >
      <Typography variant='subtitle5'>{`+${reward}`}</Typography>
      <UiIcon name={Icons.Rarimo} size={4} />
    </Stack>
  )
}

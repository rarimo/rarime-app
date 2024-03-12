import { Stack, Typography, useTheme } from '@mui/material'

import { Icons } from '@/enums'
import { UiIcon } from '@/ui'

interface Props {
  reward: number
  isFinished?: boolean
}

export default function RewardChip({ reward, isFinished }: Props) {
  const { palette } = useTheme()

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={1}
      px={1.5}
      py={0.5}
      borderRadius={12}
      bgcolor={isFinished ? palette.success.lighter : palette.warning.light}
      color={isFinished ? palette.success.dark : palette.text.primary}
    >
      <Typography variant='subtitle5'>{`+${reward}`}</Typography>
      <UiIcon name={Icons.Rarimo} size={4} />
    </Stack>
  )
}

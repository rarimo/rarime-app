import { LinearProgress, Stack, StackProps, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

const levels = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]

function getLevel(amount: number): { rank: number; progress: number } {
  for (let i = 0; i < levels.length; i++) {
    if (amount < levels[i]) {
      const delta = levels[i] - levels[i - 1]
      return {
        rank: i,
        progress: Math.floor(((amount - levels[i - 1]) / delta) * 100),
      }
    }
  }

  return {
    rank: levels.length,
    progress: 100,
  }
}

interface Props extends StackProps {
  balance: number
}

export default function LevelProgress({ balance, ...props }: Props) {
  const { palette } = useTheme()

  const level = useMemo(() => {
    return getLevel(balance ?? 0)
  }, [balance])

  return (
    <Stack spacing={2} {...props}>
      <LinearProgress value={level.progress} />
      <Stack
        direction='row'
        justifyContent={'space-between'}
        spacing={4}
        color={palette.text.secondary}
      >
        <Typography variant='caption2'>Level {level.rank}</Typography>
        <Typography variant='caption2'>
          Level {level.rank + 1} ({levels[level.rank]})
        </Typography>
      </Stack>
    </Stack>
  )
}

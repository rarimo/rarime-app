import { LinearProgress, Stack, Typography, useTheme } from '@mui/material'

export default function LevelProgress() {
  const { palette } = useTheme()

  return (
    <Stack spacing={2}>
      <LinearProgress value={90} />
      <Stack
        direction='row'
        justifyContent={'space-between'}
        spacing={4}
        color={palette.text.secondary}
      >
        <Typography variant='caption2'>Level 1</Typography>
        <Typography variant='caption2'>Level 2 (500)</Typography>
      </Stack>
    </Stack>
  )
}

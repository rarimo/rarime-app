import { Divider, Stack, Typography, useTheme } from '@mui/material'

export default function LinksBlock() {
  const { palette } = useTheme()

  return (
    <Stack border={1} borderColor={palette.divider} borderRadius={2} p={6} spacing={5}>
      <Typography variant='subtitle4'>Links</Typography>
      <Divider />
      <Typography variant='body4'>No links yet</Typography>
    </Stack>
  )
}

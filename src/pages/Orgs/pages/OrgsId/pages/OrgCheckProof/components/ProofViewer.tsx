import { Box, useTheme } from '@mui/material'

export default function ProofViewer() {
  const { palette } = useTheme()

  return (
    <Box px={4} py={2} bgcolor={palette.background.default}>
      Proof
    </Box>
  )
}

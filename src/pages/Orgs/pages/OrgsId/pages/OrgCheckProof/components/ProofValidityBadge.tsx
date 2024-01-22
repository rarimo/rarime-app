import { Typography, useTheme } from '@mui/material'

interface Props {
  valid: boolean
}

export default function ProofValidityBadge({ valid }: Props) {
  const { palette } = useTheme()

  return (
    <Typography
      variant={'caption1'}
      px={3}
      py={1}
      bgcolor={valid ? palette.success.light : palette.error.light}
      color={valid ? palette.success.dark : palette.error.dark}
      border={1}
      borderColor={valid ? palette.success.light : palette.error.light}
      borderRadius={2}
    >
      {valid ? 'Valid' : 'Invalid'}
    </Typography>
  )
}

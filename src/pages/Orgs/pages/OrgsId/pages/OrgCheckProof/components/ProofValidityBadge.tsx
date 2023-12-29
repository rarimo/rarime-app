import { Typography, useTheme } from '@mui/material'

interface Props {
  valid?: boolean
}

export default function ProofValidityBadge({ valid = false }: Props) {
  const { palette } = useTheme()

  return (
    <Typography
      variant={'caption'}
      bgcolor={valid ? palette.success.light : palette.error.light}
      border={1}
      borderColor={valid ? palette.success.light : palette.error.light}
      borderRadius={2}
      color={valid ? palette.success.dark : palette.error.dark}
      px={3}
      py={1}
    >
      {valid ? 'Valid' : 'Invalid'}
    </Typography>
  )
}

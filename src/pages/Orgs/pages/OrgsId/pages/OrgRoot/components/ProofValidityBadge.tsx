import { Typography, useTheme } from '@mui/material'

interface Props {
  valid: boolean
}

export default function ProofValidityBadge({ valid }: Props) {
  const { palette } = useTheme()

  return (
    <Typography
      variant='subtitle5'
      px={3}
      py={1}
      bgcolor={valid ? palette.success.light : palette.error.light}
      color={valid ? palette.success.dark : palette.error.dark}
      borderRadius={2}
    >
      {`${valid ? 'Valid' : 'Invalid'} Proof`}
    </Typography>
  )
}

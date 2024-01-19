import { Box, BoxProps, Typography } from '@mui/material'

interface Props extends BoxProps {
  title: string
  subtitle?: string
}

export default function PageTitles({ title, subtitle, ...rest }: Props) {
  return (
    <Box {...rest}>
      <Typography variant='h5'>{title}</Typography>
      <Typography variant='body3' mt={2}>
        {subtitle}
      </Typography>
    </Box>
  )
}

import { Box, BoxProps, Typography } from '@mui/material'
import { useEffect } from 'react'

interface Props extends BoxProps {
  title: string
  subtitle?: string
}

export default function PageTitles({ title, subtitle, ...rest }: Props) {
  useEffect(() => {
    document.title = `${title} | Rarime App`
  }, [title])

  return (
    <Box {...rest}>
      <Typography variant='h5'>{title}</Typography>
      <Typography variant='body3' mt={2}>
        {subtitle}
      </Typography>
    </Box>
  )
}

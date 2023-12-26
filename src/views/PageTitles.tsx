import { Box, BoxProps, Divider, Typography } from '@mui/material'

interface Props extends BoxProps {
  title?: string
  subtitle?: string
}

export default function PageTitles({ title, subtitle, ...rest }: Props) {
  return (
    <Box {...rest}>
      <Typography variant='h5' sx={theme => ({ mb: theme.spacing(2) })}>
        {title}
      </Typography>
      <Typography variant='body2'>{subtitle}</Typography>

      <Divider
        sx={theme => ({
          mt: theme.spacing(6),
        })}
      />
    </Box>
  )
}

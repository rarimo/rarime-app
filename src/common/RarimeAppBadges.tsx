import { Box, Stack, StackProps, useTheme } from '@mui/material'
export default function RarimeAppBadges(props: StackProps) {
  const { spacing } = useTheme()

  return (
    <Stack direction='row' spacing={6} {...props}>
      <Box
        component='img'
        src='/imgs/app-store-badge.svg'
        alt='App Store'
        height={spacing(10)}
        width='auto'
        sx={{ objectFit: 'contain' }}
      />
      <Box
        component='img'
        src='/imgs/google-play-badge.svg'
        alt='Google Play'
        height={spacing(10)}
        width='auto'
        sx={{ objectFit: 'contain' }}
      />
    </Stack>
  )
}

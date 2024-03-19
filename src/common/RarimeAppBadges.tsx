import { Box, Stack, StackProps, useTheme } from '@mui/material'

import { config } from '@/config'

export default function RarimeAppBadges(props: StackProps) {
  const { spacing } = useTheme()

  return (
    <Stack direction='row' spacing={6} {...props}>
      {config.APP_STORE_APP_LINK && (
        <Stack component='a' href={config.APP_STORE_APP_LINK} target='_blank' rel='noreferrer'>
          <Box
            component='img'
            src='/imgs/app-store-badge.svg'
            alt='App Store'
            height={spacing(10)}
            width='auto'
            sx={{ objectFit: 'contain' }}
          />
        </Stack>
      )}
      {config.GOOGLE_PLAY_APP_LINK && (
        <Stack component='a' href={config.GOOGLE_PLAY_APP_LINK} target='_blank' rel='noreferrer'>
          <Box
            component='img'
            src='/imgs/google-play-badge.svg'
            alt='Google Play'
            height={spacing(10)}
            width='auto'
            sx={{ objectFit: 'contain' }}
          />
        </Stack>
      )}
    </Stack>
  )
}

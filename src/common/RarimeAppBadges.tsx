import { Box, Stack, StackProps, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { config } from '@/config'

type AppBadgeType = 'app-store' | 'google-play'
interface AppBadgeProps {
  type: AppBadgeType
  link: string
}

function AppBadge({ type, link }: AppBadgeProps) {
  const { spacing } = useTheme()

  const imgSrc = useMemo(() => {
    const srcRecord: Record<AppBadgeType, string> = {
      'app-store': '/imgs/app-store-badge.svg',
      'google-play': '/imgs/google-play-badge.svg',
    }

    return srcRecord[type]
  }, [type])

  const imgAlt = useMemo(() => {
    const altRecord: Record<AppBadgeType, string> = {
      'app-store': 'App Store',
      'google-play': 'Google Play',
    }

    return altRecord[type]
  }, [type])

  return link ? (
    <Stack component='a' href={link} target='_blank' rel='noreferrer'>
      <Box
        component='img'
        src={imgSrc}
        alt={imgAlt}
        height={spacing(10)}
        width='auto'
        sx={{ objectFit: 'contain' }}
      />
    </Stack>
  ) : null
}

export default function RarimeAppBadges(props: StackProps) {
  return (
    <Stack direction='row' spacing={6} {...props}>
      <AppBadge type='app-store' link={config.APP_STORE_APP_LINK} />
      <AppBadge type='google-play' link={config.GOOGLE_PLAY_APP_LINK} />
    </Stack>
  )
}

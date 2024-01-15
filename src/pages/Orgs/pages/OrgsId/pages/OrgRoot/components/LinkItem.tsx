import { Stack, Typography, useTheme } from '@mui/material'
import { ComponentProps, useMemo } from 'react'

import { OrgMetadataLink } from '@/api'
import { Icons } from '@/enums'
import { UiIcon } from '@/ui'

const HOST_TO_ICON_MAP: Record<string, Icons> = {
  'facebook.com': Icons.Facebook,
  'twitter.com': Icons.Twitter,
  'instagram.com': Icons.Instagram,
}

interface Props {
  link: OrgMetadataLink
}

export default function LinkItem({ link }: Props) {
  const { palette } = useTheme()

  const iconProps = useMemo<ComponentProps<typeof UiIcon>>(() => {
    const defaultProps: ComponentProps<typeof UiIcon> = { componentName: 'link' }

    try {
      const host = new URL(link.url).host.replace(/^www\./, '')
      const iconName = HOST_TO_ICON_MAP[host]

      return iconName ? { name: iconName } : defaultProps
    } catch (error) {
      return defaultProps
    }
  }, [link.url])

  return (
    <Stack
      component={'a'}
      href={link.url}
      target={'_blank'}
      rel={'noreferrer noopener'}
      direction={'row'}
      alignItems={'center'}
      spacing={2}
      sx={{
        p: 2,
        borderRadius: 2,
        // TODO: fix colors
        bgcolor: palette.grey[100],
        transition: 'background-color 0.2s ease-in-out',
        overflow: 'hidden',
        '&:hover': {
          bgcolor: palette.grey[200],
        },
      }}
    >
      <UiIcon {...iconProps} size={6} sx={{ color: palette.text.primary }} />
      <Typography
        variant={'body3'}
        color={palette.text.primary}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {link.title}
      </Typography>
    </Stack>
  )
}

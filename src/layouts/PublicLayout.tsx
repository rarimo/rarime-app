import { Box, Stack, useTheme } from '@mui/material'
import { PropsWithChildren } from 'react'

import { config } from '@/config'
import { vh } from '@/theme/helpers'
import { UiButton } from '@/ui'

const PublicLayout = ({ children }: PropsWithChildren) => {
  const { palette, spacing } = useTheme()

  return (
    <Stack
      alignItems='center'
      justifyContent='center'
      height={vh(100)}
      width='100%'
      bgcolor={palette.background.default}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'100%'}
        px={8}
        py={3}
        bgcolor={palette.background.paper}
      >
        <Box component={'img'} src='/branding/logo-sign-in.svg' alt={config.APP_NAME} />
        {/* TODO: Update links and CTAs */}
        <UiButton color={'secondary'} size={'medium'}>
          Visit website
        </UiButton>
      </Stack>

      <Stack py={6} flex={1} overflow={'hidden auto'} width={'100%'}>
        <Stack mx={'auto'} maxWidth={spacing(220)} width={'100%'} height={'100%'}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default PublicLayout

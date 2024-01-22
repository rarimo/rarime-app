import { Box, Stack, Typography, useTheme } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { config } from '@/config'
import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler, metamaskLink } from '@/helpers'
import { useAuth, useMetamaskZkpSnapContext } from '@/hooks'
import { UiButton, UiIcon } from '@/ui'

export default function SignIn() {
  const { t } = useTranslation()
  const { connectProviders } = useAuth()
  const [isPending, setIsPending] = useState(false)

  const { palette, spacing } = useTheme()
  const { isMetamaskInstalled } = useMetamaskZkpSnapContext()

  const signIn = useCallback(async () => {
    setIsPending(true)

    try {
      await connectProviders()
    } catch (error) {
      ErrorHandler.process(error)
      setIsPending(false)
    }
  }, [connectProviders])

  const installMMLink = useMemo(() => {
    if (isMetamaskInstalled) return ''

    return metamaskLink()
  }, [isMetamaskInstalled])

  const openInstallMetamaskLink = useCallback(() => {
    if (!installMMLink) {
      bus.emit(BusEvents.warning, `Your browser is not support Metamask`)

      return
    }

    setIsPending(true)

    window.open(installMMLink, '_blank', 'noopener noreferrer')
  }, [installMMLink])

  return (
    <Stack
      alignItems='center'
      maxWidth={spacing(140)}
      width={'100%'}
      borderRadius={4}
      p={20}
      spacing={4}
      textAlign={'center'}
    >
      <Box
        component={'img'}
        src={'/branding/logo.svg'}
        alt={config.APP_NAME}
        sx={{
          width: spacing(16),
          height: spacing(16),
        }}
      />

      {/* TODO: add metamask not found texts */}
      <Typography variant='h3'>{t('sign-in-page.title')}</Typography>
      <Typography variant='body2' color={palette.text.secondary}>
        {t('sign-in-page.description')}
      </Typography>
      <Box>
        <UiButton
          startIcon={<UiIcon name={Icons.Metamask} size={5} />}
          disabled={isPending}
          sx={{ mt: 8 }}
          onClick={isMetamaskInstalled ? signIn : openInstallMetamaskLink}
        >
          {isMetamaskInstalled
            ? t('sign-in-page.connect-btn')
            : isPending
            ? t('sign-in-page.reload-page-btn')
            : t('sign-in-page.install-btn')}
        </UiButton>
      </Box>
    </Stack>
  )
}

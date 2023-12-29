import { Stack, Typography, useTheme } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler, metamaskLink } from '@/helpers'
import { useAuth, useMetamaskZkpSnapContext } from '@/hooks'
import { UiButton, UiIcon } from '@/ui'

export default function SignIn() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const [isPending, setIsPending] = useState(false)

  const { palette } = useTheme()
  const { isMetamaskInstalled } = useMetamaskZkpSnapContext()

  const signIn = useCallback(async () => {
    setIsPending(true)

    try {
      await login()
    } catch (error) {
      ErrorHandler.process(error)
    }

    setIsPending(false)
  }, [login])

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
      maxWidth={520}
      borderRadius={4}
      p={16}
      flexDirection='column'
      alignItems='center'
      bgcolor={palette.background.paper}
    >
      <UiIcon
        size={22}
        name={Icons.User}
        sx={{ background: palette.background.default, borderRadius: 100 }}
        color={palette.primary.main}
      />
      {/*Todo: add metamask not found texts*/}
      <Typography component='h4' variant='h4' sx={{ my: 4 }}>
        {t('sign-in-page.title')}
      </Typography>
      <Typography variant='body2' marginBottom={8} textAlign={'center'}>
        {t('sign-in-page.description')}
      </Typography>
      {isMetamaskInstalled ? (
        <UiButton
          onClick={signIn}
          startIcon={<UiIcon name={Icons.Metamask} />}
          disabled={isPending}
        >
          {t('sign-in-page.connect-btn')}
        </UiButton>
      ) : (
        <UiButton
          onClick={openInstallMetamaskLink}
          startIcon={<UiIcon name={Icons.Metamask} />}
          disabled={isPending}
        >
          {isPending ? t('sign-in-page.reload-page-btn') : t('sign-in-page.install-btn')}
        </UiButton>
      )}
    </Stack>
  )
}

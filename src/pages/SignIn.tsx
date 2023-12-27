import { PROVIDERS } from '@distributedlab/w3p'
import { Stack, Typography, useTheme } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler, metamaskLink } from '@/helpers'
import { useMetamaskZkpSnapContext, useWeb3Context } from '@/hooks'
import { authStore } from '@/store'
import { UiButton, UiIcon } from '@/ui'

export default function SignIn() {
  const { t } = useTranslation()
  useNavigate()
  const [isPending, setIsPending] = useState(false)

  const { palette } = useTheme()
  const { init } = useWeb3Context()
  const { isMetamaskInstalled, connectOrInstallSnap } = useMetamaskZkpSnapContext()

  const connectProvider = useCallback(async () => {
    try {
      await init(PROVIDERS.Metamask)
      await connectOrInstallSnap()

      // TODO: Replace with real auth check
      authStore.setJwt('mockJwt')
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [connectOrInstallSnap, init])

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
      sx={{
        background: palette.background.paper,
        borderRadius: 4,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '520px',
      }}
    >
      <UiIcon size={22} name={Icons.User} color='primary' />
      <Typography component='h4' variant='h4' sx={{ my: 4 }}>
        {t('sign-in-page.title')}
      </Typography>
      <Typography variant='body2' marginBottom={8} textAlign={'center'}>
        {t('sign-in-page.description')}
      </Typography>
      {isMetamaskInstalled ? (
        <UiButton
          onClick={connectProvider}
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
          {t('sign-in-page.install-btn')}
        </UiButton>
      )}
    </Stack>
  )
}

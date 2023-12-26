import { config } from '@config'
import { PROVIDERS } from '@distributedlab/w3p'
import { Box, Stack, Typography } from '@mui/material'
import { get } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useMetamaskZkpSnapContext, useWeb3Context } from '@/hooks'
import { authStore } from '@/store'
import { UiButton, UiIcon } from '@/ui'

export default function SignIn() {
  const { t } = useTranslation()
  useNavigate()
  const [isPending, setIsPending] = useState(false)

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

    const browserExtensionsLinks = {
      chrome: config.CHROME_METAMASK_ADDON_LINK,
      opera: config.OPERA_METAMASK_ADDON_LINK,
      firefox: config.FIREFOX_METAMASK_ADDON_LINK,
    }

    // Get the user-agent string
    const userAgentString = navigator.userAgent

    let chromeAgent = userAgentString.indexOf('Chrome') > -1 ? 'chrome' : ''
    const firefoxAgent = userAgentString.indexOf('Firefox') > -1 ? 'firefox' : ''
    const operaAgent = userAgentString.indexOf('OP') > -1 ? 'opera' : ''

    // Discard Chrome since it also matches Opera
    if (chromeAgent && operaAgent) chromeAgent = ''

    const currentBrowser = chromeAgent || firefoxAgent || operaAgent || ''

    if (!currentBrowser) return ''

    return get(browserExtensionsLinks, currentBrowser, '')
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
    <Stack flex={1} alignItems={'center'} justifyContent={'center'}>
      <Box
        sx={{
          background: 'var(--col-light)',
          borderRadius: 4,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '520px',
        }}
      >
        <UiIcon size={22} name={Icons.User} />
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
            {t('sign-in-page.button-connect')}
          </UiButton>
        ) : (
          <UiButton
            onClick={openInstallMetamaskLink}
            startIcon={<UiIcon name={Icons.Metamask} />}
            disabled={isPending}
          >
            {t('sign-in-page.button-install')}
          </UiButton>
        )}
      </Box>
    </Stack>
  )
}

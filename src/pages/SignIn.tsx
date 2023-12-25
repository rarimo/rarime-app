import { PROVIDERS } from '@distributedlab/w3p'
import { Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Routes } from '@/enums'
import { useMetamaskZkpSnapContext, useWeb3Context } from '@/hooks'
import { UiButton } from '@/ui'

export default function SignIn() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { init: initWeb3, provider } = useWeb3Context()
  const { connectOrInstallSnap } = useMetamaskZkpSnapContext()

  const connectWallet = async () => {
    await initWeb3(PROVIDERS.Metamask)
    await connectOrInstallSnap()
  }

  useEffect(() => {
    if (provider?.isConnected) {
      navigate(Routes.Profiles)
    }
  }, [navigate, provider?.isConnected])

  return (
    <Stack flex={1}>
      <Typography>{t('sign-in-page.title')}</Typography>
      <Typography>{t('sign-in-page.description')}</Typography>
      <UiButton onClick={connectWallet}>Connect</UiButton>
    </Stack>
  )
}

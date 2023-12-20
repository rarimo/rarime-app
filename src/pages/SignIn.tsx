import { PROVIDERS } from '@distributedlab/w3p'
import { Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { AppButton, AppModal } from '@/components'
import { Routes } from '@/enums'
import { useMetamaskZkpSnapContext, useWeb3Context } from '@/hooks'

export default function SignIn() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { init: initWeb3, provider } = useWeb3Context()
  const { connectOrInstallSnap } = useMetamaskZkpSnapContext()

  const connectWallet = async () => {
    await initWeb3(PROVIDERS.Metamask)
    await connectOrInstallSnap()
  }

  const [isOpened, setIsOpened] = useState(false)

  const openModal = () => {
    setIsOpened(true)
  }

  const onClose = () => {
    setIsOpened(false)
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
      <AppButton onClick={connectWallet}>Connect</AppButton>
      <AppButton onClick={openModal} sx={{ marginTop: '20px' }}>
        Open
      </AppButton>
      <AppModal isOpen={isOpened} onClose={onClose}>
        <Typography>default modal content</Typography>
      </AppModal>
    </Stack>
  )
}

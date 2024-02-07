import { config } from '@config'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler, metamaskLink } from '@/helpers'
import { useMetamaskZkpSnapContext } from '@/hooks'
import { UiButton, UiIcon, UiTextField } from '@/ui'

import { Steps } from './enums'

export default function SignIn() {
  const { t } = useTranslation()
  const [isPending, setIsPending] = useState(false)
  const [isSelectImportIdentity, setIsSelectImportIdentity] = useState(false)
  const [privateKey, setPrivateKey] = useState('')
  const { palette, spacing } = useTheme()
  const {
    isSnapInstalled,
    isMetamaskInstalled,
    connectOrInstallSnap,
    createIdentity: _createIdentity,
    checkSnapExists,
  } = useMetamaskZkpSnapContext()

  const installMMLink = useMemo(() => {
    if (isMetamaskInstalled) return ''

    return metamaskLink()
  }, [isMetamaskInstalled])

  const connectSnap = useCallback(async () => {
    await connectOrInstallSnap()
    await checkSnapExists()
  }, [checkSnapExists, connectOrInstallSnap])

  const openInstallMetamaskLink = useCallback(() => {
    if (!installMMLink) {
      bus.emit(BusEvents.warning, `Your browser is not support Metamask`)
      return
    }
    setIsPending(true)
    window.open(installMMLink, '_blank', 'noopener noreferrer')
  }, [installMMLink])

  const selectImportIdentity = useCallback((value: boolean) => {
    setIsSelectImportIdentity(value)
  }, [])

  const getIdentity = useCallback(() => {
    //Todo: add get identity method
  }, [])

  const createIdentity = useCallback(async () => {
    setIsPending(true)
    try {
      await _createIdentity()
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }
    setIsPending(false)
  }, [_createIdentity])

  const stepSignIn = useMemo(() => {
    return {
      [Steps.InstallMM]: (
        <UiButton
          startIcon={<UiIcon name={Icons.Metamask} size={5} />}
          disabled={isPending}
          sx={{ mt: 8 }}
          onClick={openInstallMetamaskLink}
        >
          {isPending ? t('sign-in-page.reload-page-btn') : t('sign-in-page.install-btn')}
        </UiButton>
      ),
      [Steps.InstallSnap]: (
        <UiButton
          startIcon={<UiIcon name={Icons.Rarime} size={5} />}
          sx={{ mt: 8 }}
          onClick={() => connectSnap()}
        >
          {'Enable Rarime'}
        </UiButton>
      ),

      [Steps.SelectMethodGetIdentity]: (
        <Stack spacing={2} direction={'row'}>
          <UiButton sx={{ mt: 8 }} disabled={isPending} onClick={() => selectImportIdentity(true)}>
            {'Import Identity'}
          </UiButton>
          <UiButton sx={{ mt: 8 }} disabled={isPending} onClick={createIdentity}>
            {!isPending ? 'Create Identity' : 'Creating identity...'}
          </UiButton>
        </Stack>
      ),
      [Steps.ImportPrivateKey]: (
        <Stack direction='row' alignItems='center' spacing={2}>
          <UiTextField
            value={privateKey}
            onChange={e => setPrivateKey(e.target.value)}
            label='Enter your private key'
          />
          <UiButton sx={{ mt: 8 }} onClick={getIdentity}>
            {'Confirm'}
          </UiButton>
        </Stack>
      ),
    }
  }, [
    isPending,
    openInstallMetamaskLink,
    t,
    createIdentity,
    privateKey,
    getIdentity,
    connectSnap,
    selectImportIdentity,
  ])

  const currentStep = useMemo(() => {
    if (!isMetamaskInstalled) {
      return Steps.InstallMM
    }
    if (!isSnapInstalled) {
      return Steps.InstallSnap
    }
    if (isSnapInstalled && !isSelectImportIdentity) {
      return Steps.SelectMethodGetIdentity
    }
    if (isSnapInstalled && isSelectImportIdentity) {
      return Steps.ImportPrivateKey
    }
    return Steps.InstallMM
  }, [isSelectImportIdentity, isMetamaskInstalled, isSnapInstalled])

  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      maxWidth={spacing(140)}
      width={'100%'}
      height={'100%'}
      p={20}
      mx={'auto'}
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
      <Typography variant='h3'>{t('sign-in-page.title')}</Typography>
      <Typography variant='body2' color={palette.text.secondary}>
        {t('sign-in-page.description')}
      </Typography>
      <Box>{stepSignIn[currentStep]}</Box>
    </Stack>
  )
}

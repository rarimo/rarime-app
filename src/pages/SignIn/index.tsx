import { config } from '@config'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { zkpSnap } from '@/api/clients'
import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler, metamaskLink } from '@/helpers'
import { useAuth } from '@/hooks'
import { useWeb3State } from '@/store'
import { UiButton, UiIcon, UiTextField } from '@/ui'

enum Steps {
  InstallMM = 'INSTALL_MM_STEP',
  InstallSnap = 'INSTALL_SNAP_STEP',
  SelectMethodGetIdentity = 'SELECT_METHOD_GET_IDENTITY_STEP',
  ImportPrivateKey = 'IMPORT_PRIVATE_KEY_STEP',
}

export default function SignIn() {
  const { t } = useTranslation()
  const [isPending, setIsPending] = useState(false)
  const [isSelectImportIdentity, setIsSelectImportIdentity] = useState(false)
  const [privateKey, setPrivateKey] = useState('')
  const { palette, spacing } = useTheme()
  const { isSnapInstalled, isMetamaskInstalled } = useWeb3State()
  const { connectProviders } = useAuth()

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

  const selectImportIdentity = useCallback((value: boolean) => {
    setIsSelectImportIdentity(value)
  }, [])

  const createIdentity = useCallback(
    // TODO: pass pkHex to createIdentity
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (pkHex?: string) => {
      setIsPending(true)
      try {
        // TODO: pass pkHex to createIdentity
        await zkpSnap.createIdentity({})
      } catch (error) {
        ErrorHandler.processWithoutFeedback(error)
      }
      setIsPending(false)
    },
    [],
  )

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
          onClick={() => connectProviders()}
        >
          {'Enable Rarime'}
        </UiButton>
      ),

      [Steps.SelectMethodGetIdentity]: (
        <Stack spacing={4} width={spacing(60)} mt={4}>
          <UiButton disabled={isPending} onClick={() => createIdentity()}>
            {!isPending ? 'Create new Identity' : 'Creating identity...'}
          </UiButton>

          <UiButton
            color='secondary'
            disabled={isPending}
            onClick={() => selectImportIdentity(true)}
          >
            {'Import Identity'}
          </UiButton>
        </Stack>
      ),
      [Steps.ImportPrivateKey]: (
        <Stack
          component={'form'}
          spacing={4}
          width={spacing(80)}
          mt={4}
          textAlign={'left'}
          onSubmit={e => {
            e.preventDefault()
            createIdentity(privateKey)
          }}
        >
          <UiTextField
            value={privateKey}
            type='password'
            label='Enter your private key'
            disabled={isPending}
            helperText='Your private key will be stored in MetaMask'
            onChange={e => setPrivateKey(e.target.value)}
          />
          <UiButton type='submit' disabled={!privateKey || isPending}>
            {isPending ? 'Importing...' : 'Import'}
          </UiButton>
        </Stack>
      ),
    }
  }, [
    isPending,
    openInstallMetamaskLink,
    t,
    spacing,
    privateKey,
    connectProviders,
    createIdentity,
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

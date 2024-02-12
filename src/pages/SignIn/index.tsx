import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { config } from '@/config'
import { Icons } from '@/enums'
import { ErrorHandler, metamaskLink } from '@/helpers'
import { useAuth } from '@/hooks'
import { identityStore, useWeb3State } from '@/store'
import { UiIcon, UiTextField } from '@/ui'

export default function SignIn() {
  const { t } = useTranslation()
  const { palette, spacing } = useTheme()

  const { connectProviders } = useAuth()
  const { isSnapInstalled, isMetamaskInstalled } = useWeb3State()

  const [isPending, setIsPending] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [privateKey, setPrivateKey] = useState('')

  const installSnap = useCallback(async () => {
    try {
      await connectProviders()
    } catch (error) {
      ErrorHandler.process(error)
    }
  }, [connectProviders])

  const createIdentity = useCallback(async (privateKeyHex?: string) => {
    setIsPending(true)
    try {
      await identityStore.createIdentity({ privateKeyHex })
    } catch (error) {
      ErrorHandler.process(error)
    }
    setIsPending(false)
  }, [])

  const renderContent = useCallback(() => {
    if (!isMetamaskInstalled) {
      return (
        <Button
          component={'a'}
          href={metamaskLink()}
          target='_blank'
          rel='noreferrer noopener'
          startIcon={<UiIcon name={Icons.Metamask} size={5} />}
        >
          {t('sign-in-page.install-btn')}
        </Button>
      )
    }

    if (!isSnapInstalled) {
      return (
        <Button startIcon={<UiIcon name={Icons.Rarime} size={5} />} onClick={installSnap}>
          Enable Rarime
        </Button>
      )
    }

    if (isImporting) {
      return (
        <Stack
          component={'form'}
          spacing={4}
          width={spacing(80)}
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
          <Button type='submit' disabled={!privateKey || isPending}>
            {isPending ? 'Importing...' : 'Import'}
          </Button>
        </Stack>
      )
    }

    return (
      <Stack spacing={4} width={spacing(60)}>
        <Button disabled={isPending} onClick={() => createIdentity()}>
          {!isPending ? 'Create new Identity' : 'Creating identity...'}
        </Button>
        <Button color='secondary' disabled={isPending} onClick={() => setIsImporting(true)}>
          Import Identity
        </Button>
      </Stack>
    )
  }, [
    isImporting,
    isMetamaskInstalled,
    isSnapInstalled,
    isPending,
    privateKey,
    t,
    installSnap,
    spacing,
    createIdentity,
  ])

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
      <Box mt={4}>{renderContent()}</Box>
    </Stack>
  )
}

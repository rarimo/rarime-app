import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import { useCallback, useState } from 'react'

import { Icons } from '@/enums'
import { ErrorHandler, metamaskLink } from '@/helpers'
import { useAuth } from '@/hooks'
import { identityStore, useWeb3State } from '@/store'
import { UiIcon, UiTextField } from '@/ui'

export default function SignIn() {
  const { palette } = useTheme()

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
          component='a'
          href={metamaskLink()}
          target='_blank'
          rel='noreferrer noopener'
          fullWidth
          startIcon={<UiIcon name={Icons.Metamask} size={5} />}
        >
          Install MetaMask
        </Button>
      )
    }

    if (!isSnapInstalled) {
      return (
        <Button fullWidth startIcon={<UiIcon name={Icons.Rarime} size={5} />} onClick={installSnap}>
          Enable Rarime
        </Button>
      )
    }

    if (isImporting) {
      return (
        <Stack
          component='form'
          spacing={6}
          textAlign='left'
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
      <Stack spacing={2}>
        <Button disabled={isPending} onClick={() => createIdentity()}>
          {!isPending ? 'Create new identity' : 'Creating identity...'}
        </Button>
        <Button
          color='secondary'
          startIcon={<UiIcon name={Icons.Metamask} size={5} />}
          disabled={isPending}
          onClick={() => setIsImporting(true)}
        >
          Import from MetaMask Snap
        </Button>
      </Stack>
    )
  }, [
    isImporting,
    isMetamaskInstalled,
    isSnapInstalled,
    isPending,
    privateKey,
    installSnap,
    createIdentity,
  ])

  return (
    <Stack spacing={4} alignItems='center' textAlign='center'>
      <UiIcon name={Icons.Rarime} size={12} />
      <Typography variant='h3'>Welcome</Typography>
      <Typography variant='body2' color={palette.text.secondary}>
        Manage your identity credentials and Soulbound Tokens (SBTs) easily from the RariMe
        dashboard
      </Typography>
      <Box mt={8} px={4} width='100%'>
        {renderContent()}
      </Box>
    </Stack>
  )
}

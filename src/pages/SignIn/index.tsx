import { Box, Button, Stack, Typography, useTheme } from '@mui/material'
import { useCallback, useState } from 'react'

import { Icons } from '@/enums'
import { ErrorHandler, metamaskLink } from '@/helpers'
import { useAuth } from '@/hooks'
import { identityStore, useWeb3State } from '@/store'
import { UiIcon } from '@/ui'

import ImportModal from './components/ImportModal'

export default function SignIn() {
  const { palette } = useTheme()

  const { connectProviders } = useAuth()
  const { isSnapInstalled, isMetamaskInstalled } = useWeb3State()

  const [isPending, setIsPending] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

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

  return (
    <Stack spacing={4} alignItems='center' textAlign='center'>
      <UiIcon name={Icons.Rarime} size={12} />
      <Typography variant='h3'>Welcome</Typography>
      <Typography variant='body2' color={palette.text.secondary}>
        Manage your identity credentials and Soulbound Tokens (SBTs) easily from the RariMe
        dashboard
      </Typography>
      <Box mt={8} px={4} width='100%'>
        {!isMetamaskInstalled ? (
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
        ) : !isSnapInstalled ? (
          <Button
            fullWidth
            startIcon={<UiIcon name={Icons.Rarime} size={5} />}
            onClick={installSnap}
          >
            Enable Rarime
          </Button>
        ) : (
          <Stack spacing={2}>
            <Button disabled={isPending} onClick={() => createIdentity()}>
              {!isPending ? 'Create new identity' : 'Creating identity...'}
            </Button>
            <Button
              color='secondary'
              startIcon={<UiIcon name={Icons.Metamask} size={5} />}
              disabled={isPending}
              onClick={() => setIsImportModalOpen(true)}
            >
              Import from MetaMask Snap
            </Button>
            <ImportModal
              open={isImportModalOpen}
              onClose={() => setIsImportModalOpen(false)}
              onImport={() => setIsImportModalOpen(false)}
            />
          </Stack>
        )}
      </Box>
    </Stack>
  )
}

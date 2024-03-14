import { Button, Dialog, DialogProps, Stack, useTheme } from '@mui/material'
import { FormEvent, useState } from 'react'

import { ErrorHandler } from '@/helpers'
import { identityStore } from '@/store'
import { UiDialogContent, UiDialogTitle, UiTextField } from '@/ui'

interface Props extends DialogProps {
  onImport?: () => void
}

export default function ImportModal({ onImport, ...rest }: Props) {
  const { spacing } = useTheme()

  const [isPending, setIsPending] = useState(false)
  const [privateKey, setPrivateKey] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    try {
      await identityStore.createIdentity({ privateKeyHex: privateKey })
      onImport?.()
    } catch (error) {
      ErrorHandler.process(error)
    }
    setIsPending(false)
  }

  return (
    <Dialog
      {...rest}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
        sx: { width: spacing(110) },
      }}
    >
      <UiDialogTitle onClose={rest.onClose}>Import Identity</UiDialogTitle>
      <UiDialogContent>
        <Stack spacing={6}>
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
      </UiDialogContent>
    </Dialog>
  )
}

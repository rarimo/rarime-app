import { InputAdornment, Stack, useTheme } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { sleep } from '@/helpers'
import { useLoading } from '@/hooks'
import { UiIcon, UiTextField } from '@/ui'

import CredentialField from './CredentialField'

// TODO: add credential types
export enum CredentialTypes {
  FirstName = 'firstName',
  LastName = 'lastName',
  Age = 'age',
  Telegram = 'telegram',
}

export default function ProofForm() {
  const { palette } = useTheme()
  const [params] = useSearchParams()
  const [link, setLink] = useState<string | undefined>(params.get('linkId') ?? undefined)

  const credentialTypes = useMemo(() => {
    return Object.values(CredentialTypes)
  }, [])

  const loadProofs = useCallback(async () => {
    await sleep(1000)
    return [{ link }] as { link: string }[]
  }, [link])

  const { isLoading } = useLoading<{ link: string }[]>([], loadProofs, {
    loadOnMount: true,
    loadArgs: [link],
  })

  return (
    <Stack spacing={8}>
      <UiTextField
        value={link}
        onChange={e => setLink(e.target.value)}
        placeholder={'Enter the proof link here'}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <UiIcon componentName='search' sx={{ color: palette.text.secondary }} />
            </InputAdornment>
          ),
        }}
      />

      {isLoading
        ? 'Loading...'
        : credentialTypes.map(type => <CredentialField key={type} type={type} />)}
    </Stack>
  )
}

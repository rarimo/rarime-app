import { InputAdornment, Stack, useTheme } from '@mui/material'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { sleep } from '@/helpers'
import { useLoading } from '@/hooks'
import { UiButton, UiIcon, UiTextField } from '@/ui'

import ProofViewer from './ProofViewer'

export default function ProofForm() {
  const { palette } = useTheme()
  const [params] = useSearchParams()
  const [link, setLink] = useState<string | undefined>(params.get('linkId') ?? undefined)

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

      {isLoading ? (
        'Loading...'
      ) : (
        <Stack spacing={2}>
          <UiTextField
            label={'Checking Telegram'}
            placeholder={"Enter the Telegram Handle of the Person You're Verifying"}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <UiButton variant='text' color='primary'>
                    Check
                  </UiButton>
                </InputAdornment>
              ),
            }}
          />
          <ProofViewer />
        </Stack>
      )}
    </Stack>
  )
}

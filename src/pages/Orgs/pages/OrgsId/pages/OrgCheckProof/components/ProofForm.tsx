import { InputAdornment, Stack, useTheme } from '@mui/material'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useLinkProofs } from '@/api'
import { UiIcon, UiTextField } from '@/ui'

import ProofField from './ProofField'

export default function ProofForm() {
  const { palette } = useTheme()
  const [params] = useSearchParams()
  const [linkId, setLinkId] = useState<string>(params.get('linkId') ?? '')

  const { proofs, isLoading } = useLinkProofs(linkId)

  return (
    <Stack spacing={8}>
      <UiTextField
        value={linkId}
        onChange={e => setLinkId(e.target.value)}
        placeholder={'Enter the Proof Link ID'}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <UiIcon componentName='search' sx={{ color: palette.text.secondary }} />
            </InputAdornment>
          ),
        }}
      />

      {isLoading || !proofs
        ? 'Loading...'
        : proofs.map(proof => <ProofField key={proof.id} proof={proof} />)}
    </Stack>
  )
}

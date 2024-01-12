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

  const { proofs, isLoading, isLoadingError, isEmpty } = useLinkProofs(linkId)

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

      {/* TODO: Handle states properly */}
      {isLoading ? (
        <></>
      ) : isLoadingError ? (
        <></>
      ) : isEmpty ? (
        <></>
      ) : (
        proofs.map(proof => <ProofField key={proof.id} proof={proof} />)
      )}
    </Stack>
  )
}

import { InputAdornment, Stack, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useLinkProofs } from '@/api'
import { UiIcon, UiTextField } from '@/ui'

import ProofField from './ProofField'

export default function ProofForm() {
  const { palette } = useTheme()
  const [params] = useSearchParams()
  const [linkOrLinkId, setLinkOrLinkId] = useState<string>(params.get('linkId') ?? '')

  const linkId = useMemo(() => {
    try {
      const url = new URL(linkOrLinkId)
      return url.pathname.split('/').pop() ?? ''
    } catch {
      return linkOrLinkId
    }
  }, [linkOrLinkId])

  const { proofs, isLoading, isLoadingError, isEmpty } = useLinkProofs(linkId)

  return (
    <Stack spacing={8}>
      <UiTextField
        value={linkOrLinkId}
        placeholder={'Enter the Proof Link ID or URL'}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <UiIcon componentName='search' sx={{ color: palette.text.secondary }} />
            </InputAdornment>
          ),
        }}
        onChange={e => setLinkOrLinkId(e.target.value)}
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

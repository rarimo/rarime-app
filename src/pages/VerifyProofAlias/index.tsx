import { CircularProgress, Stack } from '@mui/material'
import { useMemo } from 'react'
import { generatePath, Navigate, useParams } from 'react-router-dom'

import { useLinkProofs } from '@/api'
import { RoutePaths } from '@/enums'

export default function VerifyProofAlias() {
  const { id = '' } = useParams<{ id: string }>()
  const { proofs, isLoading, isLoadingError, isEmpty } = useLinkProofs(id)

  const orgId = useMemo(() => {
    return proofs?.[0]?.organization_id ?? ''
  }, [proofs])

  const redirectPath = useMemo(() => {
    const searchParams = new URLSearchParams()
    searchParams.append('linkId', id)

    const path = generatePath(RoutePaths.OrgsIdCheckProof, { id: orgId })
    return `${path}?${searchParams.toString()}`
  }, [id, orgId])

  if (isLoading) {
    return (
      <Stack alignItems='center' justifyContent='center' flex={1}>
        <CircularProgress />
      </Stack>
    )
  }

  // TODO: Add proper UI for error and empty states
  if (isLoadingError) return <></>
  if (isEmpty || !orgId) return <></>

  return <Navigate to={redirectPath} replace />
}

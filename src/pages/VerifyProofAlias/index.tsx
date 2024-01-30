import { CircularProgress, Stack } from '@mui/material'
import { useMemo } from 'react'
import { generatePath, Navigate, useParams } from 'react-router-dom'

import { useLinkProofs } from '@/api/modules/link'
import { RoutePaths } from '@/enums'

export default function VerifyProofAlias() {
  const { id = '' } = useParams<{ id: string }>()
  const { proofs, isLoading, isLoadingError, isEmpty } = useLinkProofs(id)

  const orgId = useMemo(() => {
    return proofs?.[0]?.org_id ?? ''
  }, [proofs])

  const redirectPath = useMemo(() => {
    const searchParams = new URLSearchParams()
    searchParams.append('linkId', id)

    const path = generatePath(RoutePaths.OrgsId, { id: orgId })
    return `${path}?${searchParams.toString()}`
  }, [id, orgId])

  if (isLoading) {
    return (
      <Stack alignItems='center' justifyContent='center' flex={1}>
        <CircularProgress color={'secondary'} />
      </Stack>
    )
  }

  // TODO: Add proper UI for error and empty states
  if (isLoadingError) return <></>
  if (isEmpty || !orgId) return <></>

  return <Navigate to={redirectPath} replace />
}

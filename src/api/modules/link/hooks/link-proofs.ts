import { useCallback } from 'react'

import { getProofsByLinkId } from '@/api/modules/link'
import { useLoading } from '@/hooks'

export const useLinkProofs = (id: string) => {
  const loadProofs = useCallback(async () => {
    if (!id) return []

    return getProofsByLinkId(id)
  }, [id])

  const {
    data: proofs,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading([], loadProofs, {
    loadOnMount: !!id,
    loadArgs: [id],
  })

  return {
    proofs,
    isLoading,
    isLoadingError,
    isEmpty,
  }
}

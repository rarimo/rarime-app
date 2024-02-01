import { useCallback } from 'react'

import { loadOrgGroups } from '@/api/modules/orgs'
import { useLoading } from '@/hooks'

/**
 *
 * @param id - organization id {@link Organization#id}
 */
export const useOrgGroups = (id?: string) => {
  const loadList = useCallback(async () => {
    if (!id) return []

    return loadOrgGroups(id)
  }, [id])

  const {
    data: orgGroups,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading([], loadList, {
    loadOnMount: !!id,
    loadArgs: [id],
  })

  return {
    orgGroups,
    isLoading,
    isLoadingError,
    isEmpty,
  }
}

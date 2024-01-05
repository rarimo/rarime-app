import { useCallback } from 'react'

import { loadOrgGroups } from '@/api'
import { useLoading } from '@/hooks'

/**
 *
 * @param id - organization id {@link Organization#id}
 */
export const useOrgGroups = (id: string) => {
  const loadList = useCallback(async () => {
    return loadOrgGroups(id)
  }, [id])

  const {
    data: orgGroups,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading([], loadList, {
    loadOnMount: true,
    loadArgs: [id],
  })

  return {
    orgGroups,
    isLoading,
    isLoadingError,
    isEmpty,
  }
}

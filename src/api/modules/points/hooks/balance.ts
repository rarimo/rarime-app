import { NotFoundError } from '@distributedlab/jac'
import { useCallback } from 'react'

import { useLoading } from '@/hooks'

import { createPointsBalance, getPointsBalance } from '../helpers'

export const useBalance = (did: string) => {
  const loadBalance = useCallback(async () => {
    try {
      const { data } = await getPointsBalance(did)
      return data
    } catch (error) {
      if (error instanceof NotFoundError) {
        const { data } = await createPointsBalance(did)
        return data
      }

      throw error
    }
  }, [did])

  const {
    data: events,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading(null, loadBalance, {
    loadOnMount: !!did,
    loadArgs: [did],
  })

  return {
    events,
    isLoading,
    isLoadingError,
    isEmpty,
  }
}

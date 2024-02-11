import { useCallback } from 'react'

import { useLoading } from '@/hooks'

import { getLeaderboard } from '../helpers'

export const useLeaderboard = () => {
  const loadLeaderboard = useCallback(async () => {
    const { data } = await getLeaderboard()
    return data
  }, [])

  const {
    data: leaderboard,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading([], loadLeaderboard, {
    loadOnMount: true,
  })

  return {
    leaderboard,
    isLoading,
    isLoadingError,
    isEmpty,
  }
}

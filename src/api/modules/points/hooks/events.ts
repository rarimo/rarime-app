import { useCallback } from 'react'

import { useLoading } from '@/hooks'

import { getEvents } from '../helpers'
import { EventsRequestQueryParams } from '../types/events'

export const useEvents = (query: EventsRequestQueryParams) => {
  const loadEvents = useCallback(async () => {
    const { data } = await getEvents(query)
    return data
  }, [query])

  const {
    data: events,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading([], loadEvents, {
    loadOnMount: !!query,
    loadArgs: [query],
  })

  return {
    events,
    isLoading,
    isLoadingError,
    isEmpty,
  }
}

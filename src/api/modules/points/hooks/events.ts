import { useLoading } from '@/hooks'

import { getEvents } from '../helpers'
import { EventsRequestQueryParams } from '../types/events'

export const useEvents = (query: EventsRequestQueryParams) => {
  const loadEvents = async () => {
    const { data } = await getEvents(query)
    return data
  }

  const {
    data: events,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading([], loadEvents, {
    loadOnMount: true,
    loadArgs: [],
  })

  return {
    events,
    isLoading,
    isLoadingError,
    isEmpty,
  }
}

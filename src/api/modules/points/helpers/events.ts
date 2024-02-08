import { api } from '@/api/clients'
import { ApiServicePaths } from '@/enums/api'

import { Event, EventsMeta, EventsRequestQueryParams } from '../types/events'

export const getEvents = async (query: EventsRequestQueryParams) => {
  return api.get<Event[], EventsMeta>(`${ApiServicePaths.Points}/v1/events`, {
    query,
  })
}

export const claimEvent = async (id: string) => {
  return api.post<Event>(`${ApiServicePaths.Points}/v1/events/${id}`, {
    body: {
      data: {
        id,
        type: 'claim_event',
      },
    },
  })
}

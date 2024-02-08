import { EventsRequestFilters } from '../enums/events'

export type EventsRequestQueryParams = {
  filter?: EventsRequestFilters
}

export type EventMetadata = {
  static: {
    name: string
    reward: number
    title: string
    description: string
    frequency: string
    no_auto_open: boolean
    expires_at: string
  }
  dynamic: {
    id: string
  } & Record<string, unknown>
}

export type Event = {
  id: string
  type: string
  status: string
  created_at: number
  updated_at: number
  points_amount: number
  meta: EventMetadata
  balance: {
    id: string
    type: string
  }
}

export type EventsMeta = {
  events_count: number
}

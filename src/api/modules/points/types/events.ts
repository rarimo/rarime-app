import { EventMetadataFrequencies, EventsRequestFilters, EventStatuses } from '../enums/events'

export type EventsRequestFiltersMap = {
  [EventsRequestFilters.Did]?: string
  [EventsRequestFilters.Status]?: EventStatuses[]
  [EventsRequestFilters.MetaStaticName]?: string
}

export type EventsRequestQueryParams = {
  filter?: EventsRequestFiltersMap
}

export type EventMetadata = {
  static: {
    name: string
    reward: number
    title: string
    description: string
    frequency: EventMetadataFrequencies
    no_auto_open: boolean
    expires_at?: string
  }
  dynamic?: Record<string, unknown>
}

export type Event = {
  id: string
  type: 'event'
  status: EventStatuses
  created_at: number
  updated_at: number
  points_amount?: number
  meta: EventMetadata
  balance: {
    id: string
    type: string
  }
}

export type EventsMeta = {
  events_count: number
}

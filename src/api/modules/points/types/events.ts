import {
  EventMetadataFrequencies,
  EventRequestPageOrder,
  EventRequestPageProperties,
  EventsRequestFilters,
  EventStatuses,
} from '../enums/events'

export type EventsRequestFiltersMap = {
  [EventsRequestFilters.Did]?: string
  [EventsRequestFilters.Status]?: EventStatuses[]
  [EventsRequestFilters.MetaStaticName]?: string
}

export type EventsRequestPageMap = {
  [EventRequestPageProperties.Limit]?: number
  [EventRequestPageProperties.Cursor]?: number
  [EventRequestPageProperties.Order]?: EventRequestPageOrder
}

export type EventsRequestQueryParams = {
  filter?: EventsRequestFiltersMap
  page?: EventsRequestPageMap
}

export type EventMetadata = {
  static: {
    name: string
    reward: number
    title: string
    description: string
    short_description: string
    image_url: string
    frequency: EventMetadataFrequencies
    no_auto_open: boolean
    expires_at?: string
    action_url?: string
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

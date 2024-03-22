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
    action_url?: string
    description: string
    expires_at?: string
    frequency: EventMetadataFrequencies
    logo: string
    name: string
    reward: number
    short_description: string
    title: string
  }
  dynamic?: Record<string, unknown>
}

// We use `PointsEvent` instead of `Event` to avoid name conflict with global `Event` type
export type PointsEvent = {
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

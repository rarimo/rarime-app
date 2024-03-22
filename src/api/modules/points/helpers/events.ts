import { api } from '@/api/clients'
import { ApiServicePaths } from '@/enums'

import { EventMetadataFrequencies, EventsRequestFilters, EventStatuses } from '../enums'
import { EventsMeta, EventsRequestQueryParams, PointsEvent } from '../types/events'

export const EVENTS_MOCK: PointsEvent[] = [
  {
    id: '1',
    type: 'event',
    status: EventStatuses.Fulfilled,
    created_at: 1628793600,
    updated_at: 1628793600,
    meta: {
      static: {
        name: 'free_weekly',
        title: 'Free weekly points',
        reward: 50,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        logo: '',
        frequency: EventMetadataFrequencies.Weekly,
        expires_at: '2024-03-12T00:00:00Z',
      },
      dynamic: {},
    },
    balance: {
      id: 'did:example:123',
      type: 'balance',
    },
  },
  {
    id: '2',
    type: 'event',
    status: EventStatuses.Fulfilled,
    created_at: 1628793600,
    updated_at: 1628793600,
    meta: {
      static: {
        name: 'free_weekly',
        title: 'Free weekly points',
        reward: 50,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        logo: '',
        frequency: EventMetadataFrequencies.Weekly,
      },
      dynamic: {},
    },
    balance: {
      id: 'did:example:123',
      type: 'balance',
    },
  },
  {
    id: '3',
    type: 'event',
    status: EventStatuses.Fulfilled,
    created_at: 1628793600,
    updated_at: 1628793600,
    meta: {
      static: {
        name: 'free_weekly',
        title: 'Free weekly points',
        reward: 50,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        logo: '',
        frequency: EventMetadataFrequencies.Weekly,
      },
      dynamic: {},
    },
    balance: {
      id: 'did:example:123',
      type: 'balance',
    },
  },
  {
    id: '4',
    type: 'event',
    status: EventStatuses.Open,
    created_at: 1628793600,
    updated_at: 1628793600,
    meta: {
      static: {
        name: 'free_weekly',
        title: 'Free weekly points',
        reward: 50,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        expires_at: '2024-03-12T00:00:00Z',
        short_description:
          'This is a weekly event where users can earn free points. Users are eligible to participate once every week. Upon participation, users will receive 100 points. These points can be used for various features in the application. Participate every week and maximize your rewards!',
        logo: 'https://placekitten.com/g/150/150',
        frequency: EventMetadataFrequencies.Weekly,

        action_url: 'https://rarime.com',
      },
      dynamic: {},
    },
    balance: {
      id: 'did:example:123',
      type: 'balance',
    },
  },
  {
    id: '5',
    type: 'event',
    status: EventStatuses.Open,
    created_at: 1628793600,
    updated_at: 1628793600,
    meta: {
      static: {
        name: 'free_weekly',
        title: 'Free weekly points',
        reward: 50,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        logo: '',
        frequency: EventMetadataFrequencies.Weekly,
      },
      dynamic: {},
    },
    balance: {
      id: 'did:example:123',
      type: 'balance',
    },
  },
  {
    id: '6',
    type: 'event',
    status: EventStatuses.Open,
    created_at: 1628793600,
    updated_at: 1628793600,
    meta: {
      static: {
        name: 'free_weekly',
        title: 'Free weekly points',
        reward: 50,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        logo: '',
        frequency: EventMetadataFrequencies.Weekly,
      },
      dynamic: {},
    },
    balance: {
      id: 'did:example:123',
      type: 'balance',
    },
  },
  {
    id: '7',
    type: 'event',
    status: EventStatuses.Claimed,
    created_at: 1628793600,
    updated_at: 1628793600,
    points_amount: 100,
    meta: {
      static: {
        name: 'free_weekly',
        title: 'Free weekly points',
        reward: 50,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        logo: '',
        frequency: EventMetadataFrequencies.Weekly,
      },
      dynamic: {},
    },
    balance: {
      id: 'did:example:123',
      type: 'balance',
    },
  },
  {
    id: '8',
    type: 'event',
    status: EventStatuses.Claimed,
    created_at: 1628793600,
    updated_at: 1628793600,
    points_amount: 100,
    meta: {
      static: {
        name: 'free_weekly',
        title: 'Free weekly points',
        reward: 50,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        logo: '',
        frequency: EventMetadataFrequencies.Weekly,
      },
      dynamic: {},
    },
    balance: {
      id: 'did:example:123',
      type: 'balance',
    },
  },
]

export const getEvents = async (query: EventsRequestQueryParams) => {
  const statuses = query.filter?.[EventsRequestFilters.Status]
  return api.get<PointsEvent[], EventsMeta>(`${ApiServicePaths.Points}/v1/public/events`, {
    query: {
      ...query,
      filter: {
        ...query.filter,
        // JsonApiClient doesn't support nested arrays in query params,
        // so we need to join them manually
        ...(statuses && { [EventsRequestFilters.Status]: statuses.join(',') }),
      },
    },
  })
}

export const getEventById = async (id: string) => {
  return api.get<PointsEvent>(`${ApiServicePaths.Points}/v1/public/events/${id}`)
}

export const claimEvent = async (id: string) => {
  return api.patch<PointsEvent>(`${ApiServicePaths.Points}/v1/public/events/${id}`, {
    body: {
      data: {
        id,
        type: 'claim_event',
      },
    },
  })
}

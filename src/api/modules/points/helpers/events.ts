import { JsonApiResponse } from '@distributedlab/jac'

import { api } from '@/api/clients'
import { ApiServicePaths } from '@/enums/api'
import { sleep } from '@/helpers'

import {
  EventMetadataFrequencies,
  EventRequestPageProperties,
  EventsRequestFilters,
  EventStatuses,
} from '../enums'
import { Event, EventsMeta, EventsRequestQueryParams } from '../types/events'

const EVENTS_MOCK: Event[] = [
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
        reward: 100,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        image_url: '',
        frequency: EventMetadataFrequencies.Weekly,
        expires_at: '2024-03-12T00:00:00Z',
        no_auto_open: false,
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
        reward: 100,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        image_url: '',
        frequency: EventMetadataFrequencies.Weekly,
        no_auto_open: false,
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
        reward: 100,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        image_url: '',
        frequency: EventMetadataFrequencies.Weekly,
        no_auto_open: false,
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
        reward: 100,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        expires_at: '2024-03-12T00:00:00Z',
        short_description:
          'This is a weekly event where users can earn free points. Users are eligible to participate once every week. Upon participation, users will receive 100 points. These points can be used for various features in the application. Participate every week and maximize your rewards!',
        image_url: 'https://placekitten.com/g/150/150',
        frequency: EventMetadataFrequencies.Weekly,
        no_auto_open: false,
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
        reward: 100,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        image_url: '',
        frequency: EventMetadataFrequencies.Weekly,
        no_auto_open: false,
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
        reward: 100,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        image_url: '',
        frequency: EventMetadataFrequencies.Weekly,
        no_auto_open: false,
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
    meta: {
      static: {
        name: 'free_weekly',
        title: 'Free weekly points',
        reward: 100,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        image_url: '',
        frequency: EventMetadataFrequencies.Weekly,
        no_auto_open: false,
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
    meta: {
      static: {
        name: 'free_weekly',
        title: 'Free weekly points',
        reward: 100,
        description:
          '## Free Weekly Points\n\nThis is a weekly event where users can earn free points.\n\n### How it works\n\n- Users are eligible to participate once every week.\n- Upon participation, users will receive 100 points.\n- These points can be used for various features in the application.\n\nParticipate every week and maximize your rewards!\n',
        short_description: '',
        image_url: '',
        frequency: EventMetadataFrequencies.Weekly,
        no_auto_open: false,
      },
      dynamic: {},
    },
    balance: {
      id: 'did:example:123',
      type: 'balance',
    },
  },
]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getEvents = async (query: EventsRequestQueryParams) => {
  // TODO: Uncomment when API is ready
  // return api.get<Event[], EventsMeta>(`${ApiServicePaths.Points}/v1/events`, {
  //   query,
  // })
  await sleep(500)

  const events = EVENTS_MOCK.filter(event => {
    const statuses = query.filter?.[EventsRequestFilters.Status]
    return statuses?.includes(event.status) ?? true
  }).slice(0, query.page?.[EventRequestPageProperties.Limit])

  return {
    data: events,
    meta: { events_count: events.length },
  } as JsonApiResponse<Event[], EventsMeta>
}

export const getEventById = async (id: string) => {
  // TODO: Uncomment when API is ready
  // return api.get<Event>(`${ApiServicePaths.Points}/v1/events/${id}`)
  await sleep(500)
  return { data: EVENTS_MOCK.find(event => event.id === id) }
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

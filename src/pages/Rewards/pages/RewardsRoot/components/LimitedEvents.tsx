import { Paper, Stack, Typography } from '@mui/material'

import { EventsRequestFilters, EventStatuses, getEvents } from '@/api/modules/points'
import { useLoading } from '@/hooks'
import { useIdentityState } from '@/store'

import LimitedEventItem from './LimitedEventItem'

export default function LimitedEvents() {
  const { userDid } = useIdentityState()

  const loadEvents = async () => {
    const { data } = await getEvents({
      filter: {
        // TODO: Replace with limited time events filter
        [EventsRequestFilters.Status]: [EventStatuses.Fulfilled],
        [EventsRequestFilters.Did]: userDid,
      },
    })

    return data
  }

  const { data: events, update } = useLoading([], loadEvents, {
    loadOnMount: true,
    loadArgs: [],
  })

  return events.length ? (
    <Paper component={Stack} spacing={6}>
      <Typography variant='subtitle3'>🔥 Limited time events</Typography>
      <LimitedEventItem event={events[0]} onClaim={update} />
    </Paper>
  ) : (
    <></>
  )
}

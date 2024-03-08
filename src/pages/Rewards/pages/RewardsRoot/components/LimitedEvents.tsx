import { Paper, Skeleton, Stack, Typography, useTheme } from '@mui/material'

import { EventsRequestFilters, EventStatuses, getEvents } from '@/api/modules/points'
import { useLoading } from '@/hooks'
import { useIdentityState } from '@/store'

import LimitedEventItem from './LimitedEventItem'

export default function LimitedEvents() {
  const { spacing } = useTheme()
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

  const {
    data: events,
    isLoading,
    update,
  } = useLoading([], loadEvents, {
    loadOnMount: true,
    loadArgs: [],
  })

  return (
    <Paper component={Stack} spacing={6}>
      <Typography variant='subtitle3'>🔥 Limited time events</Typography>
      {events.length ? (
        <LimitedEventItem event={events[0]} onClaim={update} />
      ) : isLoading ? (
        <Skeleton height={spacing(21)} />
      ) : (
        <></>
      )}
    </Paper>
  )
}

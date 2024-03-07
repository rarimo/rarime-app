import { Paper, Skeleton, Stack, Typography, useTheme } from '@mui/material'

import { EventsRequestFilters, EventStatuses, getEvents } from '@/api/modules/points'
import { useLoading } from '@/hooks'

import LimitedEventItem from './LimitedEventItem'

export default function LimitedEvents() {
  const { spacing } = useTheme()

  const loadEvents = async () => {
    const { data } = await getEvents({
      filter: {
        [EventsRequestFilters.Status]: [EventStatuses.Open],
      },
    })
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

  return (
    <Paper component={Stack} spacing={6}>
      <Typography variant='subtitle3'>🔥 Limited time events</Typography>
      {isLoading ? (
        <Skeleton height={spacing(21)} />
      ) : isEmpty || isLoadingError ? (
        <></>
      ) : (
        <LimitedEventItem event={events[0]} />
      )}
    </Paper>
  )
}

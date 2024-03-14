import { UnauthorizedError } from '@distributedlab/jac'
import { Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

import { EventsRequestFilters, EventStatuses, getEvents } from '@/api/modules/points'
import { BackLink, InfiniteList } from '@/common'
import { RoutePaths } from '@/enums'
import { useMultiPageLoading } from '@/hooks'
import { useIdentityState } from '@/store'

import EventItem from './components/EventItem'

const EVENTS_LIMIT = 20

export default function EarnHistory() {
  const navigate = useNavigate()
  const { userDid } = useIdentityState()

  const loadEvents = async () => {
    try {
      return await getEvents({
        filter: {
          [EventsRequestFilters.Status]: [EventStatuses.Claimed],
          [EventsRequestFilters.Did]: userDid,
        },
        page: { limit: EVENTS_LIMIT },
      })
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate(RoutePaths.Rewards)
      }

      throw error
    }
  }

  const { data, loadingState, load, loadNext } = useMultiPageLoading(loadEvents, {
    pageLimit: EVENTS_LIMIT,
  })

  return (
    <Stack spacing={6}>
      <BackLink to={RoutePaths.Rewards} />
      <Paper component={Stack} spacing={6}>
        <Typography variant='subtitle3'>Earn History</Typography>
        <InfiniteList
          items={data}
          loadingState={loadingState}
          errorTitle='Failed to load history'
          noDataTitle='No history yet'
          noDataAction={
            <Button component={NavLink} to={RoutePaths.Rewards} size='medium'>
              View active events
            </Button>
          }
          onLoadNext={loadNext}
          onRetry={load}
        >
          {data.map((event, index) => (
            <Stack spacing={4} key={event.id}>
              <EventItem event={event} />
              {index < data.length - 1 && <Divider sx={{ ml: 14 }} />}
            </Stack>
          ))}
        </InfiniteList>
      </Paper>
    </Stack>
  )
}

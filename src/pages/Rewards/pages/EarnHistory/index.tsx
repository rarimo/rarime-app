import { UnauthorizedError } from '@distributedlab/jac'
import { Button, Divider, Paper, Stack, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

import { EventsRequestFilters, EventStatuses, getEvents } from '@/api/modules/points'
import BackLink from '@/common/BackLink'
import InfiniteList from '@/common/InfiniteList'
import { RoutePaths } from '@/enums'
import { useMultiPageLoading } from '@/hooks/multi-page-loading'

import EventItem from './components/EventItem'

export default function EarnHistory() {
  const navigate = useNavigate()

  const loadEvents = async () => {
    try {
      return await getEvents({
        filter: {
          [EventsRequestFilters.Status]: [EventStatuses.Claimed],
        },
      })
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate(RoutePaths.Rewards)
      }

      throw error
    }
  }

  const { data, loadingState, load, loadNext } = useMultiPageLoading(loadEvents)

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
              View tasks
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

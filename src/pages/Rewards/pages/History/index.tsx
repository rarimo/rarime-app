import { UnauthorizedError } from '@distributedlab/jac'
import { Button, Paper, Stack, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'

import { EventsRequestFilters, EventStatuses, getEvents } from '@/api/modules/points'
import BackLink from '@/common/BackLink'
import InfiniteList from '@/common/InfiniteList'
import { RoutePaths } from '@/enums'
import { useMultiPageLoading } from '@/hooks/multi-page-loading'

import EventsTable from './components/EventsTable'

export default function History() {
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
        <Typography variant='subtitle3'>My History</Typography>
        <InfiniteList
          items={data}
          loadingState={loadingState}
          errorTitle='Failed to load history'
          noDataTitle='No history yet'
          noDataAction={
            <Button component={NavLink} to={RoutePaths.RewardsActive} size='medium'>
              View active tasks
            </Button>
          }
          onLoadNext={loadNext}
          onRetry={load}
        >
          <EventsTable items={data} />
        </InfiniteList>
      </Paper>
    </Stack>
  )
}

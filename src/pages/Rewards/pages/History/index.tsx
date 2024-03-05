import { Button, Paper, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { EventsRequestFilters, EventStatuses, getEvents } from '@/api/modules/points'
import BackLink from '@/common/BackLink'
import InfiniteList from '@/common/InfiniteList'
import { RoutePaths } from '@/enums'
import { useMultiPageLoading } from '@/hooks/multi-page-loading'

import EventsTable from './components/EventsTable'

export default function History() {
  const { data, loadingState, load, loadNext } = useMultiPageLoading(() =>
    getEvents({
      filter: {
        [EventsRequestFilters.Status]: [EventStatuses.Claimed],
      },
    }),
  )

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

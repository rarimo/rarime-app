import { Button, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { EventsRequestFilters, EventStatuses, useEvents } from '@/api/modules/points'
import { NoDataViewer } from '@/common'
import BackLink from '@/common/BackLink'
import ErrorViewer from '@/common/ErrorViewer'
import { RoutePaths } from '@/enums'

import EventsTable from './components/EventsTable'

export default function History() {
  const { events, isLoading, isLoadingError, isEmpty } = useEvents({
    filter: {
      [EventsRequestFilters.Status]: [EventStatuses.Claimed],
    },
  })

  return (
    <Stack spacing={6}>
      <BackLink to={RoutePaths.Rewards} />
      {isLoading ? (
        <Skeleton height={300} sx={{ borderRadius: 4 }} />
      ) : (
        <Paper component={Stack} spacing={6}>
          <Typography variant='subtitle3'>My History</Typography>
          {isLoadingError ? (
            <ErrorViewer title='Failed to load history' />
          ) : isEmpty ? (
            <NoDataViewer
              title='No history yet'
              action={
                <Button component={NavLink} to={RoutePaths.RewardsActive} size='medium'>
                  View active tasks
                </Button>
              }
            />
          ) : (
            <EventsTable events={events} />
          )}
        </Paper>
      )}
    </Stack>
  )
}

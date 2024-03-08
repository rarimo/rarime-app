import { Divider, Stack, Typography, useTheme } from '@mui/material'

import { EventsRequestFilters, EventStatuses, getEvents } from '@/api/modules/points'
import { InfiniteList } from '@/common'
import { useMultiPageLoading } from '@/hooks'
import { useIdentityState } from '@/store'

import EventItem from './EventItem'

export default function ActiveEventsList() {
  const { palette } = useTheme()
  const { userDid } = useIdentityState()

  const { data, loadingState, load, loadNext } = useMultiPageLoading(() =>
    getEvents({
      filter: {
        [EventsRequestFilters.Did]: userDid,
        [EventsRequestFilters.Status]: [EventStatuses.Open, EventStatuses.Fulfilled],
      },
    }),
  )

  return (
    <Stack
      p={6}
      spacing={6}
      bgcolor={palette.background.light}
      border={1}
      borderColor={palette.additional.layerBorder}
      borderRadius={4}
    >
      <Typography variant='subtitle3'>Earn RMO</Typography>
      <InfiniteList
        items={data}
        loadingState={loadingState}
        errorTitle='Failed to load active events'
        noDataTitle='No active events yet'
        onLoadNext={loadNext}
        onRetry={load}
      >
        <Stack spacing={4}>
          {data.map((event, index) => (
            <Stack spacing={4} key={event.id}>
              <EventItem event={event} onClaim={load} />
              {index < data.length - 1 && <Divider sx={{ ml: 14 }} />}
            </Stack>
          ))}
        </Stack>
      </InfiniteList>
    </Stack>
  )
}

import { Divider, Stack, Typography, useTheme } from '@mui/material'

import { EventsRequestFilters, EventStatuses, useEvents } from '@/api/modules/points'

export default function History() {
  const { palette } = useTheme()

  const { events, isLoading, isLoadingError, isEmpty } = useEvents({
    filter: {
      [EventsRequestFilters.Status]: [EventStatuses.Claimed],
    },
  })

  if (isLoading) return <></>
  if (isLoadingError) return <></>
  if (isEmpty) return <></>

  return (
    <Stack
      p={6}
      spacing={6}
      bgcolor={palette.background.light}
      border={1}
      borderColor={palette.additional.layerBorder}
      borderRadius={4}
    >
      <Typography variant='subtitle3'>My History</Typography>
      <Stack spacing={4}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant='overline3' color={palette.text.secondary}>
            Task name
          </Typography>
          <Typography variant='overline3' color={palette.text.secondary}>
            Earned RMO
          </Typography>
        </Stack>
        <Divider />
        {events.map((event, index) => (
          <Stack spacing={4} key={event.id}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant='subtitle4' color={palette.text.primary}>
                {event.meta.static.title}
              </Typography>
              <Stack direction={'row'} alignItems={'center'} spacing={6}>
                <Typography
                  variant='subtitle4'
                  px={2}
                  py={1}
                  borderRadius={12}
                  bgcolor={palette.action.active}
                >
                  {`🎁 +${event.points_amount}`}
                </Typography>
              </Stack>
            </Stack>
            {index !== events.length - 1 && <Divider />}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

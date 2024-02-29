import { Button, ButtonProps, Divider, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { generatePath, NavLink } from 'react-router-dom'

import { EventsRequestFilters, EventStatuses, useEvents } from '@/api/modules/points'
import { Event } from '@/api/modules/points/types/events'
import { BusEvents, RoutePaths } from '@/enums'
import { bus } from '@/helpers'
import { useIdentityState } from '@/store'
import { UiButton } from '@/ui'

import { useConfetti } from '../hooks/useConfetti'

export default function TasksList() {
  const { palette, spacing } = useTheme()
  const { userDid } = useIdentityState()
  const [newEvents, setNewEvents] = useState<Event[]>([])
  const { fireConfetti } = useConfetti()

  const { events, isLoading, isLoadingError, isEmpty } = useEvents({
    filter: {
      [EventsRequestFilters.Did]: userDid,
      [EventsRequestFilters.Status]: [EventStatuses.Open, EventStatuses.Fulfilled],
    },
  })

  const sharedButtonProps: ButtonProps = {
    size: 'medium',
    sx: { width: spacing(19), height: spacing(8) },
  }

  useEffect(() => {
    setNewEvents(events)
  }, [events])

  if (isLoading) return <Skeleton height={300} sx={{ borderRadius: 4 }} />
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
      <Typography variant='subtitle3'>Active tasks</Typography>
      <Stack spacing={4}>
        {newEvents.map((event, index) => (
          <Stack spacing={4} key={event.id}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography
                component={NavLink}
                to={generatePath(RoutePaths.RewardsActiveId, { id: event.id })}
                variant='subtitle4'
                color={palette.text.primary}
              >
                {event.meta.static.title}
              </Typography>
              <Stack direction={'row'} alignItems={'center'} spacing={6}>
                <Typography
                  variant='subtitle4'
                  px={2}
                  py={1}
                  borderRadius={12}
                  bgcolor={palette.warning.light}
                >
                  {`🎁 +${event.meta.static.reward}`}
                </Typography>

                {event.status === EventStatuses.Fulfilled ? (
                  <Button
                    {...sharedButtonProps}
                    onClick={e => {
                      fireConfetti(e.target as HTMLElement)
                      bus.emit(BusEvents.success, { message: 'Task claimed' })
                      setNewEvents(prev => prev.filter(e => e.id !== event.id))
                    }}
                  >
                    Claim
                  </Button>
                ) : (
                  <UiButton
                    component={NavLink}
                    to={generatePath(RoutePaths.RewardsActiveId, { id: event.id })}
                    color='secondary'
                    {...sharedButtonProps}
                  >
                    View
                  </UiButton>
                )}
              </Stack>
            </Stack>
            {index !== events.length - 1 && <Divider />}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

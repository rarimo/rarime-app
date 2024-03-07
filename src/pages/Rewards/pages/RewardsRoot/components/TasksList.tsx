import { Button, ButtonProps, Divider, Stack, Typography, useTheme } from '@mui/material'
import { generatePath, NavLink } from 'react-router-dom'

import { EventsRequestFilters, EventStatuses, getEvents } from '@/api/modules/points'
import InfiniteList from '@/common/InfiniteList'
import { BusEvents, RoutePaths } from '@/enums'
import { bus } from '@/helpers'
import { useMultiPageLoading } from '@/hooks/multi-page-loading'
import RewardChip from '@/pages/Rewards/components/RewardChip'
import { useIdentityState } from '@/store'
import { UiButton } from '@/ui'

import { useConfetti } from '../hooks/useConfetti'

export default function TasksList() {
  const { palette, spacing } = useTheme()
  const { userDid } = useIdentityState()
  const { fireConfetti } = useConfetti()

  const { data, loadingState, load, loadNext } = useMultiPageLoading(() =>
    getEvents({
      filter: {
        [EventsRequestFilters.Did]: userDid,
        [EventsRequestFilters.Status]: [EventStatuses.Open, EventStatuses.Fulfilled],
      },
    }),
  )

  const sharedButtonProps: ButtonProps = {
    size: 'medium',
    sx: { width: spacing(19), height: spacing(8) },
  }

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
      <InfiniteList
        items={data}
        loadingState={loadingState}
        errorTitle='Failed to load active tasks'
        noDataTitle='No active tasks yet'
        onLoadNext={loadNext}
        onRetry={load}
      >
        <Stack spacing={4}>
          {data.map((event, index) => (
            <Stack spacing={4} key={event.id}>
              <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography
                  component={NavLink}
                  to={generatePath(RoutePaths.RewardsEventId, { id: event.id })}
                  variant='subtitle4'
                  color={palette.text.primary}
                >
                  {event.meta.static.title}
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={6}>
                  <RewardChip reward={event.meta.static.reward} />
                  {event.status === EventStatuses.Fulfilled ? (
                    <Button
                      {...sharedButtonProps}
                      onClick={e => {
                        fireConfetti(e.target as HTMLElement)
                        bus.emit(BusEvents.success, {
                          message: `${event.meta.static.reward} RMO claimed!`,
                        })
                      }}
                    >
                      Claim
                    </Button>
                  ) : (
                    <UiButton
                      component={NavLink}
                      to={generatePath(RoutePaths.RewardsEventId, { id: event.id })}
                      color='secondary'
                      {...sharedButtonProps}
                    >
                      View
                    </UiButton>
                  )}
                </Stack>
              </Stack>
              {index !== data.length - 1 && <Divider />}
            </Stack>
          ))}
        </Stack>
      </InfiniteList>
    </Stack>
  )
}

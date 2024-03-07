import { Box, Paper, Skeleton, Stack, Typography, useTheme } from '@mui/material'
import { generatePath, NavLink } from 'react-router-dom'

import { EventsRequestFilters, EventStatuses, getEvents } from '@/api/modules/points'
import { RoutePaths } from '@/enums'
import { formatDateTime } from '@/helpers'
import { useLoading } from '@/hooks'
import RewardChip from '@/pages/Rewards/components/RewardChip'
import { UiButton } from '@/ui'

export default function LimitedEvents() {
  const { palette, spacing } = useTheme()

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
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={4}>
          <Stack direction={'row'} spacing={4}>
            <Box
              component={NavLink}
              to={generatePath(RoutePaths.RewardsEventId, { id: events[0].id })}
            >
              <Box
                component='img'
                src={events[0].meta.static.image_url}
                sx={{
                  bgcolor: palette.action.active,
                  borderRadius: 2,
                  objectFit: 'cover',
                  width: spacing(21),
                  height: spacing(21),
                }}
              />
            </Box>
            <Stack spacing={2}>
              <Typography
                component={NavLink}
                to={generatePath(RoutePaths.RewardsEventId, { id: events[0].id })}
                variant='subtitle4'
                color={palette.text.primary}
              >
                {events[0].meta.static.title}
              </Typography>
              <Typography
                variant='body4'
                color={palette.text.secondary}
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {events[0].meta.static.short_description}
              </Typography>
              <Stack direction={'row'} alignItems={'center'} spacing={4}>
                <RewardChip reward={events[0].meta.static.reward} />
                <Typography variant='caption2' color={palette.text.secondary}>
                  Exp: {formatDateTime(events[0].meta.static.expires_at!)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <UiButton
            component={NavLink}
            to={generatePath(RoutePaths.RewardsEventId, { id: events[0].id })}
            color='secondary'
            size='medium'
            sx={{ width: spacing(19), height: spacing(8) }}
          >
            View
          </UiButton>
        </Stack>
      )}
    </Paper>
  )
}

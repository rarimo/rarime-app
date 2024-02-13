import { Box, Stack, Typography, useTheme } from '@mui/material'
import { generatePath, NavLink } from 'react-router-dom'

import {
  EventRequestPageProperties,
  EventsRequestFilters,
  EventStatuses,
  useEvents,
} from '@/api/modules/points'
import { RoutePaths } from '@/enums'
import { formatDateTime } from '@/helpers'
import { UiButton } from '@/ui'

export default function LimitedEvents() {
  const { palette, spacing } = useTheme()

  const { events, isLoading, isLoadingError, isEmpty } = useEvents({
    filter: {
      [EventsRequestFilters.Status]: [EventStatuses.Open],
    },
    page: {
      [EventRequestPageProperties.Limit]: 1,
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
      <Typography variant='subtitle3'>🔥 Limited time events</Typography>
      {events.map(event => (
        <Stack
          key={event.id}
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          spacing={4}
        >
          <Stack direction={'row'} spacing={4}>
            <Box
              component={NavLink}
              to={generatePath(RoutePaths.RewardsActiveId, { id: event.id })}
            >
              <Box
                component='img'
                src={event.meta.static.image_url}
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
                to={generatePath(RoutePaths.RewardsActiveId, { id: event.id })}
                variant='subtitle4'
                color={palette.text.primary}
              >
                {event.meta.static.title}
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
                {event.meta.static.short_description}
              </Typography>
              <Stack direction={'row'} alignItems={'center'} spacing={4}>
                <Typography
                  variant='subtitle4'
                  px={2}
                  py={1}
                  borderRadius={12}
                  bgcolor={palette.warning.light}
                >
                  🎁 +{event.meta.static.reward}
                </Typography>
                <Typography variant='caption2' color={palette.text.secondary}>
                  Exp: {formatDateTime(event.meta.static.expires_at!)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <UiButton
            component={NavLink}
            to={generatePath(RoutePaths.RewardsActiveId, { id: event.id })}
            color='secondary'
            size='medium'
            sx={{ width: spacing(19), height: spacing(8) }}
          >
            View
          </UiButton>
        </Stack>
      ))}
    </Stack>
  )
}

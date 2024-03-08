import { Box, Stack, Typography, useTheme } from '@mui/material'
import { generatePath, NavLink } from 'react-router-dom'

import { Event } from '@/api/modules/points'
import { RoutePaths } from '@/enums'
import { formatDateTime } from '@/helpers'
import RewardChip from '@/pages/Rewards/components/RewardChip'
import { lineClamp } from '@/theme/helpers'

import EventActions from './EventActions'

type Props = {
  event: Event
}

export default function LimitedEventItem({ event }: Props) {
  const { palette, spacing } = useTheme()

  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={4}>
      <Stack direction={'row'} spacing={4}>
        <Box component={NavLink} to={generatePath(RoutePaths.RewardsEventId, { id: event.id })}>
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
            to={generatePath(RoutePaths.RewardsEventId, { id: event.id })}
            variant='subtitle4'
            color={palette.text.primary}
          >
            {event.meta.static.title}
          </Typography>
          <Typography variant='body4' color={palette.text.secondary} sx={lineClamp(2)}>
            {event.meta.static.short_description}
          </Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={4}>
            <RewardChip reward={event.meta.static.reward} />
            <Typography variant='caption2' color={palette.text.secondary}>
              Exp: {formatDateTime(event.meta.static.expires_at!)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <EventActions event={event} />
    </Stack>
  )
}
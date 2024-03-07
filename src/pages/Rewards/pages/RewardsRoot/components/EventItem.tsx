import { Stack, Typography, useTheme } from '@mui/material'
import { generatePath, NavLink } from 'react-router-dom'

import { Event } from '@/api/modules/points/types/events'
import { Icons, RoutePaths } from '@/enums'
import RewardChip from '@/pages/Rewards/components/RewardChip'
import { lineClamp } from '@/theme/helpers'
import { UiIcon } from '@/ui'

import EventActions from './EventActions'

type Props = {
  event: Event
}

export default function EventItem({ event }: Props) {
  const { palette } = useTheme()

  return (
    <Stack direction={'row'} spacing={4} justifyContent={'space-between'} alignItems={'center'}>
      <Stack direction={'row'} spacing={4} alignItems='center'>
        <Stack
          p={2.5}
          bgcolor={palette.additional.pureBlack}
          color={palette.common.white}
          borderRadius={250}
        >
          <UiIcon name={Icons.Gift} size={5} />
        </Stack>
        <Stack spacing={1}>
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
        </Stack>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} spacing={4}>
        <RewardChip reward={event.meta.static.reward} />
        <EventActions event={event} />
      </Stack>
    </Stack>
  )
}

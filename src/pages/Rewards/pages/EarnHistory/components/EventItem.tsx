import { Stack, Typography, useTheme } from '@mui/material'

import { Event } from '@/api/modules/points/types/events'
import { Icons } from '@/enums'
import { formatDateDMY, timestampToDate } from '@/helpers'
import RewardChip from '@/pages/Rewards/components/RewardChip'
import { UiIcon } from '@/ui'

interface Props {
  event: Event
}

export default function EventItem({ event }: Props) {
  const { palette } = useTheme()

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
      <Stack direction={'row'} spacing={4} alignItems='center'>
        <Stack
          p={2.5}
          bgcolor={palette.action.active}
          color={palette.text.secondary}
          borderRadius={250}
        >
          <UiIcon name={Icons.Gift} size={5} />
        </Stack>
        <Stack spacing={1}>
          <Typography variant='subtitle4' color={palette.text.primary}>
            {event.meta.static.title}
          </Typography>
          <Typography variant='body4' color={palette.text.secondary}>
            {formatDateDMY(timestampToDate(event.created_at))}
          </Typography>
        </Stack>
      </Stack>
      <RewardChip finished reward={event.meta.static.reward} />
    </Stack>
  )
}

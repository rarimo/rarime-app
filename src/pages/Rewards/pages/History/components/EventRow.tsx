import { Stack, Typography, useTheme } from '@mui/material'

import { Event } from '@/api/modules/points/types/events'
import { Icons } from '@/enums'
import { formatDateDMY } from '@/helpers'
import RewardChip from '@/pages/Rewards/components/RewardChip'
import { UiIcon } from '@/ui'

interface Props {
  event: Event
}

export default function EventRow({ event }: Props) {
  const { palette } = useTheme()

  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
      <Stack direction={'row'} spacing={4} alignItems='center'>
        <Stack
          p={2}
          bgcolor={palette.action.active}
          color={palette.text.secondary}
          borderRadius={250}
        >
          <UiIcon name={Icons.Gift} size={5} />
        </Stack>
        <Stack>
          <Typography variant='subtitle4' color={palette.text.primary}>
            {event.meta.static.title}
          </Typography>
          <Typography variant='body4' color={palette.text.secondary}>
            {formatDateDMY(new Date(event.created_at * 1000))}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} spacing={6}>
        <RewardChip finished reward={event.meta.static.reward} />
      </Stack>
    </Stack>
  )
}

import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material'

import { Event } from '@/api/modules/points'
import { MarkdownViewer } from '@/common'
import { formatDateTime } from '@/helpers'
import RewardChip from '@/pages/Rewards/components/RewardChip'

interface Props {
  event: Event
}

export default function EventView({ event }: Props) {
  const { palette, spacing } = useTheme()

  return (
    <Stack spacing={6}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Stack spacing={4}>
          <Typography variant='subtitle2'>{event.meta.static.title}</Typography>
          <Stack direction={'row'} alignItems={'center'} spacing={4}>
            <RewardChip reward={event.meta.static.reward} />
            {event.meta.static.expires_at && (
              <Typography variant='caption2' color={palette.text.secondary}>
                Exp: {formatDateTime(event.meta.static.expires_at!)}
              </Typography>
            )}
          </Stack>
        </Stack>
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
      </Stack>
      <Divider />
      <MarkdownViewer>{event?.meta.static.description ?? ''}</MarkdownViewer>
      {event.meta.static.action_url && (
        <Button
          component={'a'}
          href={event.meta.static.action_url}
          target='_blank'
          sx={{ width: spacing(40) }}
        >
          {"Let's Start"}
        </Button>
      )}
    </Stack>
  )
}

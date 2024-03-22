import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material'

import { EventNames, PointsEvent } from '@/api/modules/points'
import { MarkdownViewer } from '@/common'
import { Icons } from '@/enums'
import { formatDateTime } from '@/helpers'
import RewardChip from '@/pages/Rewards/components/RewardChip'
import { UiIcon } from '@/ui'

import InvitationLinks from './InvitationLinks'

interface Props {
  event: PointsEvent
}

export default function EventView({ event }: Props) {
  const { palette, spacing } = useTheme()

  return (
    <Stack spacing={6}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Stack spacing={4}>
          <Typography variant='subtitle2'>{event.meta.static.title}</Typography>
          <Stack direction='row' alignItems='center' spacing={4}>
            <RewardChip reward={event.meta.static.reward} />
            {event.meta.static.expires_at && (
              <Typography variant='caption2' color={palette.text.secondary}>
                {'Exp: '}
                {formatDateTime(event.meta.static.expires_at)}
              </Typography>
            )}
          </Stack>
        </Stack>
        {event.meta.static.logo ? (
          <Box
            component='img'
            src={event.meta.static.logo}
            sx={{
              bgcolor: palette.action.active,
              borderRadius: 2,
              objectFit: 'cover',
              width: spacing(21),
              height: spacing(21),
            }}
          />
        ) : (
          <Stack
            bgcolor={palette.action.active}
            color={palette.text.primary}
            borderRadius={2}
            width={spacing(21)}
            height={spacing(21)}
            justifyContent='center'
            alignItems='center'
          >
            <UiIcon name={Icons.Gift} size={10} />
          </Stack>
        )}
      </Stack>
      <Divider />
      {event.meta.static.name === EventNames.RefferalCommon ? (
        <InvitationLinks event={event} />
      ) : (
        <>
          <MarkdownViewer>{event?.meta.static.description ?? ''}</MarkdownViewer>
          {event.meta.static.action_url && (
            <Button
              component='a'
              href={event.meta.static.action_url}
              target='_blank'
              rel='noreferrer noopener'
              sx={{ width: spacing(40) }}
            >
              {`Let's Start`}
            </Button>
          )}
        </>
      )}
    </Stack>
  )
}

import { Divider, Stack, Typography, useTheme } from '@mui/material'

import { Event } from '@/api/modules/points/types/events'

import EventRow from './EventRow'

interface Props {
  items: Event[]
}

export default function EventsTable({ items }: Props) {
  const { palette } = useTheme()

  return (
    <Stack spacing={4}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant='overline3' color={palette.text.secondary}>
          Task name
        </Typography>
        <Typography variant='overline3' color={palette.text.secondary}>
          Earned RMO
        </Typography>
      </Stack>
      <Divider />
      {items.map((event, index) => (
        <Stack spacing={4} key={event.id}>
          <EventRow event={event} />
          {index !== items.length - 1 && <Divider />}
        </Stack>
      ))}
    </Stack>
  )
}

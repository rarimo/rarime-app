import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Stack, Typography } from '@mui/material'

import { UiIcon, UiIconButton, UiTextField } from '@/ui'

interface Props {
  id: number | string
}

export default function LinkForm({ id }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })

  return (
    <Stack
      ref={setNodeRef}
      spacing={2}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      sx={{
        bgcolor: theme => theme.palette.background.paper,
        position: 'relative',
        zIndex: isDragging ? 1000 : 0,
      }}
    >
      <Stack direction='row' justifyContent={'space-between'}>
        <Typography variant='subtitle4'>Link {id}</Typography>
        <Stack direction={'row'} spacing={4}>
          <UiIconButton color='secondary' sx={{ cursor: 'grab' }} {...attributes} {...listeners}>
            <UiIcon componentName='dragIndicator' size={5} />
          </UiIconButton>
          <UiIconButton color='error'>
            <UiIcon componentName='deleteOutlined' size={5} />
          </UiIconButton>
        </Stack>
      </Stack>
      <UiTextField size='small' placeholder={'Title'} />
      <UiTextField size='small' placeholder={'URL'} />
    </Stack>
  )
}

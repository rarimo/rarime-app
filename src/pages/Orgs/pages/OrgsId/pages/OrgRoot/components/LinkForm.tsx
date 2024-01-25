import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FormControl, Stack, Typography } from '@mui/material'
import { Control, Controller, FieldErrors } from 'react-hook-form'

import { UiIcon, UiIconButton, UiTextField } from '@/ui'

interface Props {
  field: {
    id: string
    title: string
    url: string
  }
  control: Control<{
    links: {
      title: string
      url: string
    }[]
  }>
  formErrors: FieldErrors<{
    links: {
      title: string
      url: string
    }[]
  }>
  index: number
  onRemove?: () => void
}

export default function LinkForm({ field, control, index, formErrors, onRemove }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
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
        <Typography variant='subtitle4'>Link {index + 1}</Typography>
        <Stack direction={'row'} spacing={4}>
          <UiIconButton color='secondary' sx={{ cursor: 'grab' }} {...attributes} {...listeners}>
            <UiIcon componentName='dragIndicator' size={5} />
          </UiIconButton>
          <UiIconButton color='error' onClick={onRemove}>
            <UiIcon componentName='deleteOutlined' size={5} />
          </UiIconButton>
        </Stack>
      </Stack>

      <Controller
        name={`links.${index}.title`}
        control={control}
        render={({ field }) => (
          <FormControl>
            <UiTextField
              {...field}
              size='small'
              placeholder={'Title'}
              errorMessage={formErrors.links?.[index]?.title?.message?.toString() ?? ''}
            />
          </FormControl>
        )}
      />

      <Controller
        name={`links.${index}.url`}
        control={control}
        render={({ field }) => (
          <FormControl>
            <UiTextField
              {...field}
              size='small'
              placeholder={'URL'}
              errorMessage={formErrors.links?.[index]?.url?.message?.toString() ?? ''}
            />
          </FormControl>
        )}
      />
    </Stack>
  )
}

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FormControl, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { Controller, FieldArrayWithId, FieldPath } from 'react-hook-form'

import { OrgMetadataLink } from '@/api/modules/orgs'
import { Form } from '@/hooks'
import { UiIcon, UiIconButton, UiTextField } from '@/ui'

interface Props {
  field: FieldArrayWithId<OrgMetadataLink>
  form: Form<{ links: OrgMetadataLink[] }>
  index: number
  onRemove?: () => void
}

export default function LinkForm({ field, index, form, onRemove }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: field.id,
  })

  const formFields = useMemo<
    {
      name: FieldPath<{ links: OrgMetadataLink[] }>
      placeholder: string
    }[]
  >(
    () => [
      {
        name: `links.${index}.title`,
        placeholder: 'Title',
      },
      {
        name: `links.${index}.url`,
        placeholder: 'URL',
      },
    ],
    [index],
  )

  const hasManyLinks = useMemo(() => form.formState.links.length > 1, [form])

  return (
    <Stack
      ref={setNodeRef}
      spacing={2}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      sx={{
        position: 'relative',
        bgcolor: theme => theme.palette.background.paper,
        zIndex: isDragging ? 1000 : 0,
      }}
    >
      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='subtitle4'>
          {'Link '}
          {index + 1}
        </Typography>
        {hasManyLinks && (
          <Stack direction='row' spacing={4}>
            <UiIconButton color='secondary' sx={{ cursor: 'grab' }} {...attributes} {...listeners}>
              <UiIcon componentName='dragIndicator' size={5} />
            </UiIconButton>
            <UiIconButton color='error' onClick={onRemove}>
              <UiIcon componentName='deleteOutlined' size={5} />
            </UiIconButton>
          </Stack>
        )}
      </Stack>

      {formFields.map(({ name, placeholder }) => (
        <Controller
          key={name}
          name={name}
          control={form.control}
          render={({ field }) => (
            <FormControl>
              <UiTextField
                {...field}
                size='small'
                placeholder={placeholder}
                errorMessage={form.getErrorMessage(name)}
              />
            </FormControl>
          )}
        />
      ))}
    </Stack>
  )
}

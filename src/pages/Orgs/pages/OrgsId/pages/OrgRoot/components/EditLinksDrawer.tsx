import { DrawerProps, Stack } from '@mui/material'
import { FormEvent, useCallback } from 'react'
import { useFieldArray } from 'react-hook-form'

import { OrgMetadataLink } from '@/api'
import VerticalDraggableContext from '@/contexts/vertical-draggable'
import { BusEvents } from '@/enums'
import { bus, ErrorHandler, sleep } from '@/helpers'
import { useForm } from '@/hooks'
import { UiButton, UiDrawer, UiDrawerActions, UiDrawerContent, UiDrawerTitle, UiIcon } from '@/ui'

import LinkForm from './LinkForm'

interface Props extends DrawerProps {
  links: OrgMetadataLink[]
  onLinksUpdate?: () => void
}

const DEFAULT_VALUES = {
  links: [
    {
      title: '',
      url: '',
    },
  ],
}

export default function EditLinksDrawer({ links, onLinksUpdate, ...rest }: Props) {
  const { handleSubmit, disableForm, enableForm, control, formErrors } = useForm(
    DEFAULT_VALUES,
    yup =>
      yup.object().shape({
        links: yup.array().of(
          yup.object().shape({
            title: yup.string().required(),
            url: yup.string().url().required(),
          }),
        ),
      }),
  )

  const { fields, append, remove, move } = useFieldArray({
    name: 'links',
    control,
  })

  const submit = useCallback(async () => {
    disableForm()

    try {
      // TODO: update links
      await sleep(500)
      console.log(fields)
      onLinksUpdate?.()
      bus.emit(BusEvents.success, {
        message: 'Links updated',
      })
    } catch (error) {
      ErrorHandler.process(error)
    }

    enableForm()
  }, [fields, disableForm, enableForm, onLinksUpdate])

  return (
    <UiDrawer
      PaperProps={{
        component: 'form',
        onSubmit: (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          handleSubmit(submit)()
        },
      }}
      {...rest}
    >
      <UiDrawerTitle onClose={rest.onClose}>
        {links.length ? 'Edit links' : 'Add links'}
      </UiDrawerTitle>
      <UiDrawerContent>
        <Stack spacing={4}>
          <VerticalDraggableContext items={fields} onItemsMove={move}>
            {fields.map((field, index) => (
              <LinkForm
                key={field.id}
                field={field}
                control={control}
                index={index}
                formErrors={formErrors}
                onRemove={() => remove(fields.indexOf(field))}
              />
            ))}
          </VerticalDraggableContext>
        </Stack>

        <UiButton
          variant='text'
          color='secondary'
          size='medium'
          startIcon={<UiIcon componentName='add' size={5} />}
          onClick={() => append({ title: '', url: '' })}
          sx={{ mt: fields.length ? 4 : 0 }}
        >
          Add links
        </UiButton>
      </UiDrawerContent>
      <UiDrawerActions>
        <UiButton type='submit' fullWidth>
          Save
        </UiButton>
      </UiDrawerActions>
    </UiDrawer>
  )
}

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
  onLinksUpdate?: (links: OrgMetadataLink[]) => void
}

const DEFAULT_LINK_VALUES: OrgMetadataLink = {
  title: '',
  url: '',
}

export default function EditLinksDrawer({ links, onLinksUpdate, ...rest }: Props) {
  const form = useForm(
    {
      links: links.length ? links : [DEFAULT_LINK_VALUES],
    },
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
    control: form.control,
  })

  const submit = useCallback(async () => {
    form.disableForm()

    try {
      // TODO: update links
      await sleep(500)
      onLinksUpdate?.(fields)
      bus.emit(BusEvents.success, {
        message: 'Links updated',
      })
    } catch (error) {
      ErrorHandler.process(error)
    }

    form.enableForm()
  }, [fields, form, onLinksUpdate])

  return (
    <UiDrawer
      PaperProps={{
        component: 'form',
        onSubmit: (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          form.handleSubmit(submit)()
        },
      }}
      {...rest}
    >
      <UiDrawerTitle onClose={rest.onClose}>
        {links.length ? 'Edit links' : 'Add links'}
      </UiDrawerTitle>
      <UiDrawerContent>
        <Stack spacing={4}>
          <VerticalDraggableContext
            items={fields}
            onItemsMove={(a, b) => {
              console.log(a, b, fields)
              move(a, b)
            }}
          >
            {fields.map((field, index) => (
              <LinkForm
                key={field.id}
                field={field}
                index={index}
                form={form}
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

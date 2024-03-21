import { Button, CircularProgress, Drawer, DrawerProps, Stack } from '@mui/material'
import { FormEvent, useCallback } from 'react'
import { useFieldArray } from 'react-hook-form'

import { OrgMetadataLink, updateOrgMetadata } from '@/api/modules/orgs'
import VerticalDraggableContext from '@/contexts/vertical-draggable'
import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler } from '@/helpers'
import { useForm } from '@/hooks'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { UiDialogActions, UiDialogContent, UiDialogTitle, UiIcon } from '@/ui'

import LinkForm from './LinkForm'

interface Props extends DrawerProps {
  links: OrgMetadataLink[]
  onLinksUpdate?: (links: OrgMetadataLink[]) => void
}

const DEFAULT_LINK_VALUES: OrgMetadataLink = {
  title: '',
  url: '',
}

const MAX_LINKS_COUNT = 10

export default function EditLinksDrawer({ links, onLinksUpdate, ...rest }: Props) {
  const { org } = useOrgDetails()

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

  const submit = useCallback(
    async ({ links }: { links: OrgMetadataLink[] }) => {
      form.disableForm()

      try {
        await updateOrgMetadata(org.id, { links })
        onLinksUpdate?.(links)
        bus.emit(BusEvents.success, {
          message: 'Links updated',
        })
      } catch (error) {
        ErrorHandler.process(error)
      }

      form.enableForm()
    },
    [form, org.id, onLinksUpdate],
  )

  return (
    <Drawer
      PaperProps={{
        component: 'form',
        onSubmit: (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          form.handleSubmit(submit)()
        },
      }}
      {...rest}
    >
      <UiDialogTitle onClose={rest.onClose}>
        {links.length ? 'Edit links' : 'Add links'}
      </UiDialogTitle>
      <UiDialogContent>
        <Stack spacing={4}>
          <VerticalDraggableContext items={fields} onItemsMove={move}>
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

        {fields.length < MAX_LINKS_COUNT && (
          <Button
            variant='text'
            color='secondary'
            size='medium'
            startIcon={<UiIcon name={Icons.Plus} size={5} />}
            onClick={() => append({ title: '', url: '' })}
            sx={{ mt: fields.length ? 4 : 0 }}
          >
            Add link
          </Button>
        )}
      </UiDialogContent>
      <UiDialogActions>
        <Button type='submit' fullWidth>
          Save
        </Button>
      </UiDialogActions>

      {form.isFormDisabled && (
        <Stack
          justifyContent='center'
          alignItems='center'
          position='absolute'
          top={0}
          left={0}
          bottom={0}
          right={0}
          bgcolor={theme => theme.palette.background.light}
        >
          <CircularProgress color='inherit' />
        </Stack>
      )}
    </Drawer>
  )
}

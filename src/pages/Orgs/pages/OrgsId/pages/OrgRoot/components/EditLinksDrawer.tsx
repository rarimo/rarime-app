import { DrawerProps, Stack } from '@mui/material'
import { FormEvent, useState } from 'react'

import { OrgMetadataLink } from '@/api'
import VerticalDraggableContext from '@/contexts/vertical-draggable'
import { UiButton, UiDrawer, UiDrawerActions, UiDrawerContent, UiDrawerTitle, UiIcon } from '@/ui'

import LinkForm from './LinkForm'

interface Props extends DrawerProps {
  links: OrgMetadataLink[]
  onLinksUpdate?: () => void
}

export default function EditLinksDrawer({ links, onLinksUpdate, ...rest }: Props) {
  const [items, setItems] = useState([1, 2, 3])

  return (
    <UiDrawer
      PaperProps={{
        component: 'form',
        onSubmit: (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          // TODO: implement
          onLinksUpdate?.()
        },
      }}
      {...rest}
    >
      <UiDrawerTitle onClose={rest.onClose}>
        {links.length ? 'Edit links' : 'Add links'}
      </UiDrawerTitle>
      <UiDrawerContent>
        <Stack spacing={4}>
          <VerticalDraggableContext items={items} setItems={setItems}>
            {items.map(id => (
              <LinkForm key={id} id={id} />
            ))}
          </VerticalDraggableContext>
        </Stack>

        <UiButton
          variant='text'
          color='secondary'
          startIcon={<UiIcon componentName='add' size={5} />}
          sx={{ mt: 3 }}
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

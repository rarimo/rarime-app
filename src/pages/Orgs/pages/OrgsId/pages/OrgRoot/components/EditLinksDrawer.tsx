import { DrawerProps, Stack, Typography } from '@mui/material'
import { FormEvent } from 'react'

import { OrgMetadataLink } from '@/api'
import {
  UiButton,
  UiDrawer,
  UiDrawerActions,
  UiDrawerContent,
  UiDrawerTitle,
  UiIcon,
  UiIconButton,
  UiTextField,
} from '@/ui'

interface Props extends DrawerProps {
  links: OrgMetadataLink[]
  onLinksUpdate?: () => void
}

export default function EditLinksDrawer({ links, onLinksUpdate, ...rest }: Props) {
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
        <Stack spacing={2}>
          <Stack direction='row' justifyContent={'space-between'}>
            <Typography variant='subtitle4'>Link 1</Typography>
            <Stack direction={'row'} spacing={4}>
              <UiIconButton color='secondary'>
                <UiIcon componentName='info' size={5} />
              </UiIconButton>
              <UiIconButton color='error'>
                <UiIcon componentName='delete' size={5} />
              </UiIconButton>
            </Stack>
          </Stack>
          <UiTextField size='small' placeholder={'Title'} />
          <UiTextField size='small' placeholder={'URL'} />
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

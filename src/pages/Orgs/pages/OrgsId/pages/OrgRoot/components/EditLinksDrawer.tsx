import { DrawerProps } from '@mui/material'

import { OrgMetadataLink } from '@/api'
import { UiButton, UiDrawer } from '@/ui'

interface Props extends DrawerProps {
  links: OrgMetadataLink[]
}

export default function EditLinksDrawer({ links, ...rest }: Props) {
  return (
    <UiDrawer
      {...rest}
      header={links.length ? 'Edit links' : 'Add links'}
      actions={<UiButton fullWidth>Save</UiButton>}
    >
      content
    </UiDrawer>
  )
}

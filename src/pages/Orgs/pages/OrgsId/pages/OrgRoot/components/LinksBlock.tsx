import { Button, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

import { NoDataView } from '@/common'
import { Icons } from '@/enums'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { UiIcon } from '@/ui'

import EditLinksDrawer from './EditLinksDrawer'
import LinkItem from './LinkItem'

export default function LinksBlock() {
  const { org, isOrgOwner } = useOrgDetails()
  const { palette } = useTheme()
  const [isLinkDrawerShown, setIsLinkDrawerShown] = useState(false)
  const [links, setLinks] = useState(org.metadata.links ?? [])

  return (
    <Stack
      spacing={6}
      bgcolor={palette.background.light}
      p={6}
      border={1}
      borderColor={palette.divider}
      borderRadius={4}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='subtitle3'>Links</Typography>
        {!!links.length && isOrgOwner && (
          <Button
            variant='text'
            size='medium'
            color='secondary'
            startIcon={<UiIcon name={Icons.PencilSimpleLine} size={5} />}
            onClick={() => setIsLinkDrawerShown(true)}
          >
            Edit
          </Button>
        )}
      </Stack>
      <Stack direction='row' spacing={4} flexWrap='wrap'>
        {links.length ? (
          links.map((link, index) => <LinkItem key={index} link={link} />)
        ) : (
          <NoDataView
            title='No Links'
            action={
              isOrgOwner && (
                <Button size='medium' onClick={() => setIsLinkDrawerShown(true)}>
                  Add
                </Button>
              )
            }
          />
        )}
      </Stack>

      <EditLinksDrawer
        open={isLinkDrawerShown}
        links={links}
        onClose={() => setIsLinkDrawerShown(false)}
        onLinksUpdate={links => {
          setIsLinkDrawerShown(false)
          setLinks(links)
        }}
      />
    </Stack>
  )
}

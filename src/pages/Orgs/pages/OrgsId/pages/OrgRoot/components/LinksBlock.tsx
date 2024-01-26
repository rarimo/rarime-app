import { Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

import { NoDataViewer } from '@/common'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { UiButton, UiIcon } from '@/ui'

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
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant={'subtitle3'}>Links</Typography>
        {!!links.length && isOrgOwner && (
          <UiButton
            variant={'text'}
            size={'medium'}
            color={'secondary'}
            startIcon={<UiIcon componentName='driveFileRenameOutlineOutlined' size={5} />}
            onClick={() => setIsLinkDrawerShown(true)}
          >
            Edit
          </UiButton>
        )}
      </Stack>
      <Stack direction={'row'} spacing={4} flexWrap={'wrap'}>
        {links.length ? (
          links.map((link, index) => <LinkItem key={index} link={link} />)
        ) : (
          <NoDataViewer
            icon={'🔗'}
            title={'No Links'}
            action={
              isOrgOwner && (
                <UiButton size='medium' onClick={() => setIsLinkDrawerShown(true)}>
                  Add
                </UiButton>
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

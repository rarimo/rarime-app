import { Divider, Stack, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'

import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'

import LinkItem from './LinkItem'

export default function LinksBlock() {
  const { org } = useOrgDetails()
  const { palette } = useTheme()

  const links = useMemo(() => {
    return org.metadata.links ?? []
  }, [org.metadata.links])

  return (
    <Stack border={1} borderColor={palette.divider} borderRadius={2} p={6} spacing={5}>
      <Typography variant='subtitle4'>Links</Typography>
      <Divider />

      <Stack direction={'row'} gap={4} flexWrap={'wrap'}>
        {links.length ? (
          links.map((link, index) => <LinkItem key={index} link={link} />)
        ) : (
          <Typography
            variant='body3'
            color={palette.text.secondary}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
          >
            No links yet
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

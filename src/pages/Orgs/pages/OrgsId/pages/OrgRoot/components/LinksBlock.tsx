import { Stack, Typography, useTheme } from '@mui/material'

import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'

import LinkItem from './LinkItem'

export default function LinksBlock() {
  const { org } = useOrgDetails()
  const { palette } = useTheme()

  return (
    <Stack
      spacing={6}
      bgcolor={palette.background.light}
      p={6}
      border={1}
      borderColor={palette.divider}
      borderRadius={4}
    >
      <Typography variant={'subtitle3'}>Links</Typography>
      <Stack direction={'row'} gap={4} flexWrap={'wrap'}>
        {org.metadata.links?.length ? (
          org.metadata.links.map((link, index) => <LinkItem key={index} link={link} />)
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

import { Box, Stack } from '@mui/material'
import { NavLink, useParams } from 'react-router-dom'

import { PageTitles } from '@/common'
import { UiButton } from '@/ui'

export default function OrgRoot() {
  const { id } = useParams<{ id: string }>()

  return (
    <Stack flex={1}>
      <PageTitles title={`Organization ${id}`} subtitle='Some organization description' />

      <Box mt={6}>
        <NavLink to={`/organisations/${id}/check-proof`}>
          <UiButton component='div'>Check proof</UiButton>
        </NavLink>
      </Box>
    </Stack>
  )
}

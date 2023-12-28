import { Box, Stack } from '@mui/material'
import { generatePath, NavLink, useParams } from 'react-router-dom'

import { PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { UiButton } from '@/ui'

export default function OrgRoot() {
  const { id = null } = useParams<{ id: string }>()

  return (
    <Stack flex={1}>
      <PageTitles title={`Organization ${id}`} subtitle='Some organization description' />

      <Box mt={6}>
        <NavLink to={generatePath(RoutePaths.OrgsIdCheckProof, { id })}>
          <UiButton component='div'>Check proof</UiButton>
        </NavLink>
      </Box>
    </Stack>
  )
}

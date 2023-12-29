import { Stack } from '@mui/material'
import { useParams } from 'react-router-dom'

import { PageTitles } from '@/common'

export default function OrgCheckProof() {
  const { id } = useParams<{ id: string }>()

  return (
    <Stack flex={1}>
      <PageTitles title={`OrgCheckProof ${id}`} subtitle='Some organization description' />
    </Stack>
  )
}

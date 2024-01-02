import { CircularProgress, Stack } from '@mui/material'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

import { RoutePaths } from '@/enums'
import { sleep } from '@/helpers'

export default function VerifyProofAlias() {
  const navigate = useNavigate()
  const { id = '' } = useParams<{ id: string }>()

  const redirectToCheckProof = async () => {
    // TODO: get link by id
    await sleep(500)
    // TODO: get orgId from link
    const orgId = 'test-org-id'

    const searchParams = new URLSearchParams()
    searchParams.append('linkId', id)

    const path = generatePath(RoutePaths.OrgsIdCheckProof, { id: orgId })
    navigate(`${path}?${searchParams.toString()}`)
  }

  useEffectOnce(() => {
    redirectToCheckProof()
  })

  return (
    <Stack alignItems='center' justifyContent='center' flex={1}>
      <CircularProgress />
    </Stack>
  )
}

import { CircularProgress, Stack } from '@mui/material'
import { generatePath, useNavigate } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

import { RoutePaths } from '@/enums'
import { sleep } from '@/helpers'

export default function VerifyProofAlias() {
  const navigate = useNavigate()
  // TODO: use link ID from URL
  // const { id = '' } = useParams<{ id: string }>()

  const redirectToCheckProof = async () => {
    // TODO: get proof info
    await sleep(500)
    const orgId = 'test-org-id'
    const proofId = 'test-proof-id'

    const searchParams = new URLSearchParams()
    searchParams.append('proof', proofId)

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

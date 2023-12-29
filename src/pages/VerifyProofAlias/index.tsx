import { CircularProgress, Stack } from '@mui/material'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { useEffectOnce } from 'react-use'

import { RoutePaths } from '@/enums'
import { sleep } from '@/helpers'

export default function VerifyProofAlias() {
  const navigate = useNavigate()
  const { id = '' } = useParams<{ id: string }>()

  const redirectToCheckProof = async () => {
    // TODO: get proof info
    await sleep(500)

    const searchParams = new URLSearchParams()
    searchParams.append('proof', 'proof')
    const path = generatePath(RoutePaths.OrgsIdCheckProof, { id })
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

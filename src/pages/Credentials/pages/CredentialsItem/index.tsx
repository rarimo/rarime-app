import { Stack } from '@mui/material'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { CredentialCard } from '@/common'
import { getClaimId } from '@/helpers'
import { useCredentialsContext } from '@/pages/Credentials/contexts'

export default function CredentialsItem() {
  const { claimId = '' } = useParams<{ claimId: string }>()

  const { vcs } = useCredentialsContext()

  const vc = useMemo(() => {
    return vcs.find(vc => getClaimId(vc.id) === claimId)
  }, [claimId, vcs])

  if (!vc) return <></>

  return (
    <Stack spacing={6}>
      <CredentialCard vc={vc} />
    </Stack>
  )
}

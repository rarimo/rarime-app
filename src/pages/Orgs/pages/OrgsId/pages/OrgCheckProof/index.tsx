import { Stack } from '@mui/material'

import { useOrgDetails } from '../../hooks'
import { CheckProofHead, OrgOverview, ProofForm } from './components'

export default function OrgCheckProof() {
  const { org } = useOrgDetails()

  return (
    <Stack spacing={8}>
      <CheckProofHead />
      <Stack justifyContent={'center'} spacing={8}>
        <OrgOverview org={org} />
        <ProofForm />
      </Stack>
    </Stack>
  )
}

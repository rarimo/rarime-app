import { Box, Stack } from '@mui/material'

import { useOrgDetails } from '../../hooks'
import { CheckProofHead, OrgOverview, ProofForm } from './components'

export default function OrgCheckProof() {
  const { org } = useOrgDetails()

  return (
    <Box>
      <CheckProofHead />
      <Stack
        justifyContent={'center'}
        spacing={8}
        maxWidth={500}
        width={'100%'}
        my={16}
        mx={'auto'}
      >
        <OrgOverview org={org} />
        <ProofForm />
      </Stack>
    </Box>
  )
}

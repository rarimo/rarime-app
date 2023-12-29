import { Box, Stack } from '@mui/material'

import { CheckProofHead, OrgOverview, ProofForm } from './components'

export default function OrgCheckProof() {
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
        <OrgOverview />
        <ProofForm />
      </Stack>
    </Box>
  )
}

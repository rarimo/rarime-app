import { Grid, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

import { useLinkProofs } from '@/api'

import LinkForm from './LinkForm'
import ProofFieldForm from './ProofFieldForm'

export default function VerifyProofsBlock() {
  const { palette } = useTheme()
  const [linkId, setLinkId] = useState('')
  const { proofs, isLoading, isLoadingError, isEmpty } = useLinkProofs(linkId)

  return (
    <Stack
      spacing={6}
      bgcolor={palette.background.light}
      p={6}
      border={1}
      borderColor={palette.divider}
      borderRadius={4}
    >
      <Stack spacing={4}>
        <Typography variant={'subtitle3'}>Verify proofs</Typography>
        <Typography variant={'body3'} color={palette.text.secondary}>
          Please use Verify to check whether the source officially represents Rarimo. Email address,
          phone number,Discord ID, Twitter account or Telegram ID.
        </Typography>
      </Stack>

      <LinkForm isLoading={isLoading} onLinkIdChange={setLinkId} />

      {linkId && (
        <>
          {/* TODO: Handle states properly */}
          {isLoading ? (
            <></>
          ) : isLoadingError ? (
            <></>
          ) : isEmpty ? (
            <></>
          ) : (
            <Grid container spacing={6}>
              {proofs.map(proof => (
                <Grid item xs={6} key={proof.id}>
                  <ProofFieldForm proof={proof} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Stack>
  )
}

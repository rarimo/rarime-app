import { Grid, Stack, Typography, useTheme } from '@mui/material'
import { useState } from 'react'

import { useLinkProofs } from '@/api/modules/link'
import { Icons } from '@/enums'
import { UiIcon, UiTooltip } from '@/ui'

import ProofFieldForm from './ProofFieldForm'
import ProofsLinkForm from './ProofsLinkForm'

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
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography variant='subtitle3'>Verify proofs</Typography>
          <UiTooltip
            title={
              // TODO: update text
              'Please use Verify to check whether the source officially represents Rarimo. Email address, phone number, Discord ID, Twitter account or Telegram ID.'
            }
          >
            <UiIcon name={Icons.Info} size={4} sx={{ color: palette.text.secondary }} />
          </UiTooltip>
        </Stack>
        <Typography variant='body3' color={palette.text.secondary}>
          {/* TODO: update text */}
          Please use Verify to check whether the source officially represents Rarimo. Email address,
          phone number, Discord ID, Twitter account or Telegram ID.
        </Typography>
      </Stack>

      <ProofsLinkForm isLoading={isLoading} onLinkIdChange={setLinkId} />

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

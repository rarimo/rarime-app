import { Divider, InputAdornment, Stack, Typography, useTheme } from '@mui/material'
import { useCallback, useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { UiButton, UiIcon, UiTextField } from '@/ui'

export default function VerifyProofsBlock() {
  const { id = null } = useParams()
  const navigate = useNavigate()
  const { palette } = useTheme()

  const [linkOrLinkId, setLinkOrLinkId] = useState('')

  const navigateToCheckProof = useCallback(() => {
    const searchParams = new URLSearchParams()
    searchParams.append('linkId', linkOrLinkId)

    const path = generatePath(RoutePaths.OrgsIdCheckProof, { id })
    navigate(`${path}?${searchParams.toString()}`)
  }, [id, linkOrLinkId, navigate])

  return (
    <Stack border={1} borderColor={palette.divider} borderRadius={2} p={6} spacing={5}>
      <Typography variant='subtitle4'>Verify Organisational Proofs</Typography>

      <Divider />

      <UiTextField
        value={linkOrLinkId}
        placeholder={'Enter the Proof Link ID or URL'}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <UiIcon componentName='search' sx={{ color: palette.text.secondary }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <UiButton
                variant='text'
                color='primary'
                disabled={!linkOrLinkId}
                onClick={navigateToCheckProof}
              >
                Verify
              </UiButton>
            </InputAdornment>
          ),
        }}
        onChange={e => setLinkOrLinkId(e.target.value)}
      />
    </Stack>
  )
}

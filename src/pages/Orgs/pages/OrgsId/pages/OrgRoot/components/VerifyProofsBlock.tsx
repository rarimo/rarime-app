import { InputAdornment, Stack, Typography, useTheme } from '@mui/material'
import { useCallback, useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { UiButton, UiSearchField } from '@/ui'

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
    <Stack
      spacing={6}
      sx={{
        bgcolor: palette.background.light,
        p: 6,
        border: 1,
        borderColor: palette.divider,
        borderRadius: 4,
      }}
    >
      <Typography variant={'subtitle3'}>Verify proofs</Typography>
      <UiSearchField
        value={linkOrLinkId}
        size='medium'
        placeholder={'Enter the Proof Link ID or URL'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <UiButton
                variant='text'
                color='secondary'
                size='medium'
                disabled={!linkOrLinkId}
                sx={{ minWidth: 'auto' }}
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

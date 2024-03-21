import { Button, InputAdornment } from '@mui/material'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { UiSearchField } from '@/ui'

interface Props {
  isLoading: boolean
  onLinkIdChange: (linkId: string) => void
}

export default function ProofsLinkForm({ isLoading, onLinkIdChange }: Props) {
  const [params] = useSearchParams()
  const [linkOrLinkId, setLinkOrLinkId] = useState(params.get('linkId') ?? '')
  const [isVerifying, setIsVerifying] = useState(false)

  const linkId = useMemo(() => {
    if (!isVerifying) return ''

    try {
      const url = new URL(linkOrLinkId)
      return url.pathname.split('/').pop() || ''
    } catch {
      return linkOrLinkId
    }
  }, [linkOrLinkId, isVerifying])

  const handleLinkChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLinkOrLinkId(e.target.value)
      setIsVerifying(false)
    },
    [setLinkOrLinkId, setIsVerifying],
  )

  useEffect(() => {
    onLinkIdChange(linkId)
  }, [linkId, onLinkIdChange])

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        setIsVerifying(true)
      }}
    >
      <UiSearchField
        value={linkOrLinkId}
        size='medium'
        placeholder='Enter the Proof Link ID or URL'
        sx={{ mt: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Button
                type='submit'
                variant='text'
                color='secondary'
                size='medium'
                disabled={!linkOrLinkId || isLoading}
                sx={{ minWidth: 'auto' }}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
            </InputAdornment>
          ),
        }}
        onChange={handleLinkChange}
      />
    </form>
  )
}

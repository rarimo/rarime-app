import { CircularProgress, Stack } from '@mui/material'
import { useEffect } from 'react'

export default function DownloadApp() {
  useEffect(() => {
    // location.replace('https://apps.apple.com')
  }, [])

  return (
    <Stack alignItems='center' justifyContent='center' flex={1}>
      <CircularProgress color='secondary' />
    </Stack>
  )
}

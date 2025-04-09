import { Button, Stack, Typography, useTheme } from '@mui/material'
import { VerificationStatus } from '@rarimo/zk-passport'
import { useMemo } from 'react'

import StepView from './StepView'

export default function VerificationStatusStep({
  status,
  onRetry,
}: {
  status: VerificationStatus
  onRetry: () => void
}) {
  const { palette } = useTheme()

  const icon = useMemo(() => {
    switch (status) {
      case 'verified':
        return '✅'
      case 'uniqueness_check_failed':
      case 'failed_verification':
        return '❌'
      default:
        return '⏳'
    }
  }, [status])

  const title = useMemo(() => {
    switch (status) {
      case 'verified':
        return 'Verified'
      case 'uniqueness_check_failed':
        return 'Uniqueness Check Failed'
      case 'failed_verification':
        return 'Failed Verification'
      default:
        return 'Waiting For Verification...'
    }
  }, [status])

  const description = useMemo(() => {
    switch (status) {
      case 'verified':
        return 'The proof is successfully verified'
      case 'uniqueness_check_failed':
        return 'The proof is valid, but the identity is not unique'
      case 'failed_verification':
        return 'The proof is invalid, verification failed'
      default:
        return 'The proof is being verified'
    }
  }, [status])

  return (
    <StepView title='Step 3/3' subtitle='Check the verification status'>
      <Stack spacing={6}>
        <Stack spacing={1} alignItems='center' textAlign='center'>
          <Typography variant='h2'>{icon}</Typography>
          <Typography variant='h6' color={palette.text.primary} mt={3}>
            {title}
          </Typography>
          <Typography variant='body3' color={palette.text.secondary}>
            {description}
          </Typography>
        </Stack>
        <Button onClick={onRetry} fullWidth sx={{ mt: 2 }}>
          Restart Demo
        </Button>
      </Stack>
    </StepView>
  )
}

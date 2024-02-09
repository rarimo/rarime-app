import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'

import { Icons } from '@/enums'
import { useLoading } from '@/hooks'
import { rewardsStore } from '@/store'
import { UiIcon } from '@/ui'

export default function EnterProgram() {
  const { palette, spacing } = useTheme()
  const { isLoading, reload } = useLoading(undefined, rewardsStore.authorize, {
    loadOnMount: false,
  })

  return (
    <Paper>
      <Stack spacing={5} alignItems='center' maxWidth={spacing(120)} mx='auto' textAlign='center'>
        <Stack p={3} borderRadius={250} bgcolor={palette.action.active}>
          <UiIcon name={Icons.Rarimo} size={10} />
        </Stack>
        <Typography variant='h6' maxWidth={spacing(50)}>
          Enter into rewards program
        </Typography>
        <Typography variant='body2' color={palette.text.secondary}>
          Claim airdrops & earn RMO
        </Typography>
        <Divider flexItem />
        <Button
          fullWidth
          size='large'
          startIcon={isLoading && <CircularProgress size={spacing(5)} color='secondary' />}
          disabled={isLoading}
          onClick={reload}
        >
          {isLoading ? 'Authorizing...' : 'Enter Program'}
        </Button>
      </Stack>
    </Paper>
  )
}

import { CircularProgress, Stack, StackProps } from '@mui/material'

export default function OverlaySpinner(props: StackProps) {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      position='absolute'
      top={0}
      left={0}
      bottom={0}
      right={0}
      bgcolor={theme => theme.palette.background.light}
      zIndex={theme => theme.zIndex.modal}
      {...props}
    >
      <CircularProgress color='inherit' />
    </Stack>
  )
}

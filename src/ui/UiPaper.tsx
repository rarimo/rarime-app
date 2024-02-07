import { Paper, PaperProps } from '@mui/material'

type Props = PaperProps

export default function UiPaper({ children, ...rest }: Props) {
  return (
    <Paper {...rest} elevation={0} variant='outlined' square={false}>
      {children}
    </Paper>
  )
}

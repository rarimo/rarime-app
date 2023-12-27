import { Stack, StackProps } from '@mui/material'

interface Props extends StackProps {}

export default function OrgNewForm({ ...rest }: Props) {
  return <Stack {...rest}></Stack>
}

import { LinearProgress, Stack, StackProps } from '@mui/material'

import { OrgGroupRequest } from '@/api'

import ApprovedCard from './ApprovedCard'

interface Props extends StackProps {
  orgGroupRequest: OrgGroupRequest
}

export default function PublishingCard({ orgGroupRequest, ...rest }: Props) {
  return (
    <Stack {...rest}>
      <LinearProgress variant='determinate' value={24} />
      <ApprovedCard orgGroupRequest={orgGroupRequest} />
    </Stack>
  )
}

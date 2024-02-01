import { Card, CardContent, CardProps, Typography } from '@mui/material'

import { OrgGroupRequest } from '@/api/modules/orgs'

interface Props extends CardProps {
  orgGroupRequest: OrgGroupRequest
}

export default function ListItem({ orgGroupRequest, ...rest }: Props) {
  return (
    <Card {...rest}>
      <CardContent>
        <Typography>{orgGroupRequest.id}</Typography>
      </CardContent>
    </Card>
  )
}

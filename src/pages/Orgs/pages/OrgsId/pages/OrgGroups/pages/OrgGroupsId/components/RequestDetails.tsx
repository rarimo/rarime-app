import { Divider, Stack, StackProps, Typography } from '@mui/material'

import { OrgGroupRequest } from '@/api/modules/orgs'
import { getTargetProperty, loadAndParseCredentialSchema } from '@/api/modules/zkp'
import { useLoading } from '@/hooks'

interface Props extends StackProps {
  orgGroupRequest: OrgGroupRequest
}

export default function RequestDetails({ orgGroupRequest, children, ...rest }: Props) {
  const { data: vcFields } = useLoading(
    [],
    () =>
      Promise.all(
        orgGroupRequest.credential_requests.map(async req =>
          getTargetProperty(
            await loadAndParseCredentialSchema(req.credential_schema, req.credential_subject),
          ),
        ),
      ),
    {
      loadOnMount: true,
      loadArgs: [orgGroupRequest],
    },
  )

  return (
    <Stack {...rest} flex={1} p={5}>
      <Stack>
        {vcFields.map((el, idx) => (
          <Stack key={idx} spacing={4}>
            <Typography>{el?.key}</Typography>
            <Typography>{el?.value}</Typography>
          </Stack>
        ))}
      </Stack>

      <Divider />
      <Stack flex={1}>{children}</Stack>
      <Divider />
    </Stack>
  )
}

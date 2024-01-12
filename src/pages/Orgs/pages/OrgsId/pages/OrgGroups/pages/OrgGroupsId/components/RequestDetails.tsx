import { Divider, Stack, StackProps, Typography } from '@mui/material'

import { loadAndParseRequestCredentialSchemas, OrgGroupRequest } from '@/api'
import { useLoading } from '@/hooks'

interface Props extends StackProps {
  orgGroupRequest: OrgGroupRequest
}

export default function RequestDetails({ orgGroupRequest, children, ...rest }: Props) {
  const { data: vcFields } = useLoading(
    [],
    () => loadAndParseRequestCredentialSchemas(orgGroupRequest),
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
            <Typography>{el.key}</Typography>
            <Typography>{el.value}</Typography>
          </Stack>
        ))}
      </Stack>

      <Divider />
      <Stack flex={1}>{children}</Stack>
      <Divider />
    </Stack>
  )
}

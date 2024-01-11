import { Divider, Stack, StackProps, Typography } from '@mui/material'
import { ReactNode } from 'react'

import { OrgGroupRequest, parseRequestCredentialSchemas } from '@/api'
import { useLoading } from '@/hooks'

interface Props extends StackProps {
  orgGroupRequest: OrgGroupRequest

  bodySlot?: ReactNode

  actionsSlot?: ReactNode
}

export default function RequestDetails({ orgGroupRequest, bodySlot, actionsSlot, ...rest }: Props) {
  const { data: VCsFields } = useLoading([], () => parseRequestCredentialSchemas(orgGroupRequest), {
    loadOnMount: true,
    loadArgs: [orgGroupRequest],
  })

  return (
    <Stack {...rest} flex={1} p={5}>
      <Stack>
        {VCsFields.map((el, idx) => (
          <Stack key={idx}>
            <Typography>{el.key}</Typography>
            <Typography>{el.value}</Typography>
          </Stack>
        ))}
      </Stack>

      <Divider />
      <Stack mb='auto' gap={2}>
        {bodySlot}
      </Stack>
      <Divider />

      <Stack mt='auto' gap={2}>
        {actionsSlot}
      </Stack>
    </Stack>
  )
}

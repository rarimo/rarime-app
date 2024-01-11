import { alpha, LinearProgress, Stack, StackProps, Typography } from '@mui/material'
import { useMemo } from 'react'

import {
  getOrgGroupPublishingRequests,
  OrgGroupRequest,
  OrgGroupRequestPublishing,
  OrgGroupRequestPublishingStatuses,
} from '@/api'
import { useLoading } from '@/hooks'

import ApprovedCard from './ApprovedCard'

interface Props extends StackProps {
  orgGroupRequest: OrgGroupRequest
}

export default function PublishingCard({ orgGroupRequest, ...rest }: Props) {
  const { data: publishingCreds } = useLoading(
    [] as OrgGroupRequestPublishing[],
    () => {
      return getOrgGroupPublishingRequests({
        orgId: orgGroupRequest.org_id,
        groupId: orgGroupRequest.group_id,
        reqId: orgGroupRequest.id,
      })
    },
    {
      loadOnMount: true,
      loadArgs: [orgGroupRequest],
    },
  )

  const progress = useMemo(() => {
    if (!publishingCreds?.length) return 0

    const confirmedCreds = publishingCreds.filter(
      cred => cred.status === OrgGroupRequestPublishingStatuses.Confirmed,
    )

    return (confirmedCreds.length / publishingCreds.length) * 100
  }, [publishingCreds])

  return (
    <Stack {...rest} position='relative'>
      <ApprovedCard orgGroupRequest={orgGroupRequest} />
      <Stack
        justifyContent='center'
        alignItems='center'
        sx={theme => ({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: alpha(theme.palette.background.paper, 0.7),
        })}
      >
        <Stack
          sx={theme => ({
            alignItems: 'center',
            width: '100%',
            background: theme.palette.background.paper,
            p: 6,
            boxShadow: theme.shadows[1],
            spacing: 2,
          })}
        >
          <Typography color='primary'>{progress}%</Typography>
          <LinearProgress variant='determinate' value={progress} sx={{ width: '100%' }} />
        </Stack>
      </Stack>
    </Stack>
  )
}

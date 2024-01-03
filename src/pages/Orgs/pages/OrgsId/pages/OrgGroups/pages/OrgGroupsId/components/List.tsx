import { Divider, Stack, StackProps } from '@mui/material'
import { useCallback } from 'react'

import { OrgGroupRequest, OrgGroupRequestFiltersMap } from '@/api'
import { loadOrgGroupRequests } from '@/api/modules/orgs/helpers/org-groups-requests'
import { useLoading } from '@/hooks'

interface Props extends StackProps {
  filter: OrgGroupRequestFiltersMap
}

export default function List({ filter, ...rest }: Props) {
  // TODO: add pagination
  const loadList = useCallback(async () => {
    return loadOrgGroupRequests({ filter })
  }, [filter])

  const {
    data: orgGroupRequests,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading<OrgGroupRequest[]>([], loadList, {
    loadOnMount: true,
  })

  return (
    <Stack {...rest}>
      {isLoading ? (
        <></>
      ) : isLoadingError ? (
        <></>
      ) : isEmpty ? (
        <></>
      ) : (
        orgGroupRequests.map((el, idx) => (
          <div key={idx}>
            {el.id}
            <Divider />
            {el.status.name}
            <Divider />
            <br />
            <Divider />
          </div>
        ))
      )}
    </Stack>
  )
}

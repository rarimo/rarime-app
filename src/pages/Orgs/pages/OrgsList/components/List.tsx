import { Stack, StackProps } from '@mui/material'
import { useCallback } from 'react'

import { loadOrgs, Organization, type OrgsRequestFiltersMap } from '@/api'
import { useLoading } from '@/hooks'

interface Props extends StackProps {
  filter: OrgsRequestFiltersMap
}

export default function List({ filter, ...rest }: Props) {
  // TODO: add pagination
  const loadList = useCallback(async () => {
    return loadOrgs({ filter })
  }, [filter])

  const {
    data: orgList,
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading<Organization[]>([], loadList, {
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
        orgList.map(org => <div key={org.id}>{org.domain}</div>)
      )}
    </Stack>
  )
}

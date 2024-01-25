import { JsonApiResponseLinks } from '@distributedlab/jac'
import { CircularProgress, Grid, Pagination, Stack, StackProps } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import { loadOrgs, Organization, type OrgsRequestFiltersMap, OrgsRequestPage } from '@/api'
import { useLoading } from '@/hooks'

import ListCard from './ListCard'

interface Props extends StackProps {
  filter: OrgsRequestFiltersMap
}

export default function List({ filter, ...rest }: Props) {
  const [page, setPage] = useState({ [OrgsRequestPage.Cursor]: '0', [OrgsRequestPage.Limit]: 1 })

  // TODO: add pagination
  const loadList = useCallback(async () => {
    return loadOrgs({ filter, page })
  }, [filter, page])

  const {
    data: { data: orgList, meta },
    isLoading,
    isLoadingError,
    isEmpty,
    reload,
  } = useLoading<{ data: Organization[]; links: JsonApiResponseLinks }>({}, loadList, {
    loadOnMount: true,
  })

  useEffect(() => {
    reload()
    console.log(page)
  }, [filter, page])

  return (
    <Stack {...rest}>
      {isLoading ? (
        <Stack width={'100%'} alignItems={'center'} justifyContent={'center'}>
          <CircularProgress />
        </Stack>
      ) : isLoadingError ? (
        <></>
      ) : isEmpty ? (
        <></>
      ) : (
        <Grid container spacing={6}>
          {orgList.map(org => (
            <Grid key={org.id} item xs={6}>
              <ListCard org={org} />
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination
        count={3}
        onChange={(_, page) =>
          setPage(prevState => ({
            ...prevState,
            [OrgsRequestPage.Cursor]: String(page),
          }))
        }
      />
    </Stack>
  )
}

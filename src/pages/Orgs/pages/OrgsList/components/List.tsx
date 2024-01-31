import { Grid, Pagination, Stack, StackProps } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import {
  loadOrgs,
  OrgsRequestFilters,
  type OrgsRequestFiltersMap,
  OrgsRequestPage,
  type LoadListResponseType,
} from '@/api/modules/orgs'
import { useLoading } from '@/hooks'

import ListCard from './ListCard'
import ListSkeleton from './ListSkeleton'

interface Props extends StackProps {
  filter: OrgsRequestFiltersMap
}

const ORGS_PAGE_LIMIT = 10

export default function List({ filter, ...rest }: Props) {
  const [page, setPage] = useState({
    [OrgsRequestPage.Number]: 1,
    [OrgsRequestPage.Limit]: ORGS_PAGE_LIMIT,
  })

  const loadList = useCallback(async () => {
    return loadOrgs({ filter, page })
  }, [filter, page])

  const {
    data: { data: orgList, meta },
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading<LoadListResponseType>({} as LoadListResponseType, loadList, {
    loadArgs: [filter, page],
    loadOnMount: true,
  })

  useEffect(() => {
    setPage(prevState => ({
      ...prevState,
      [OrgsRequestPage.Number]: 1,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter[OrgsRequestFilters.Metadata]])

  return (
    <Stack {...rest}>
      {isLoading ? (
        <ListSkeleton cardsCount={ORGS_PAGE_LIMIT} />
      ) : isLoadingError ? (
        <></>
      ) : isEmpty ? (
        <></>
      ) : (
        <>
          <Grid container spacing={6}>
            {orgList.map(org => (
              <Grid key={org.id} item xs={6}>
                <ListCard org={org} />
              </Grid>
            ))}
          </Grid>
          <Stack alignItems='center' mt={6} {...rest}>
            <Pagination
              count={Math.ceil(meta?.count / ORGS_PAGE_LIMIT)}
              page={page[OrgsRequestPage.Number]}
              onChange={(_, page) =>
                setPage(prevState => ({
                  ...prevState,
                  [OrgsRequestPage.Number]: page,
                }))
              }
            />
          </Stack>
        </>
      )}
    </Stack>
  )
}

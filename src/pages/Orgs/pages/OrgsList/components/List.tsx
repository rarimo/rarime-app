import { Grid, Pagination, Stack, StackProps } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import { loadOrgs, OrgsRequestFilters, type OrgsRequestFiltersMap, OrgsRequestPage } from '@/api'
import { useLoading } from '@/hooks'
import { LoadListResponseType } from '@/types'

import ListCard from './ListCard'
import ListSkeleton from './ListSkeleton'

interface Props extends StackProps {
  filter: OrgsRequestFiltersMap
}

const ORGS_PAGE_LIMIT = 10

export default function List({ filter, ...rest }: Props) {
  const [page, setPage] = useState({
    [OrgsRequestPage.Number]: 0,
    [OrgsRequestPage.Limit]: ORGS_PAGE_LIMIT,
  })
  const [prevStateMetaData, setPrevStateMetaData] = useState<string | undefined>('')

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
    if (filter[OrgsRequestFilters.Metadata] !== prevStateMetaData) {
      setPage(prevState => ({
        ...prevState,
        //Todo: change the page to 1 when the API is ready
        [OrgsRequestPage.Number]: 0,
      }))
      setPrevStateMetaData(filter[OrgsRequestFilters.Metadata])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter[OrgsRequestFilters.Metadata]])

  return (
    <Stack {...rest}>
      {isLoading ? (
        <ListSkeleton amountCard={ORGS_PAGE_LIMIT} />
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
          {/*Todo: remove increment when the API is ready*/}
          <Stack alignItems='center' mt={6} {...rest}>
            <Pagination
              count={Math.ceil(meta?.count / ORGS_PAGE_LIMIT) ?? 0}
              page={page[OrgsRequestPage.Number] + 1}
              onChange={(_, page) =>
                setPage(prevState => ({
                  ...prevState,
                  [OrgsRequestPage.Number]: page - 1,
                }))
              }
            />
          </Stack>
        </>
      )}
    </Stack>
  )
}

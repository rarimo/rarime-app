import { JsonApiDefaultMeta } from '@distributedlab/jac'
import { Grid, Stack, StackProps, useTheme } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import {
  loadOrgs,
  Organization,
  OrgsRequestFilters,
  type OrgsRequestFiltersMap,
  OrgsRequestPage,
} from '@/api'
import { PageListPagination } from '@/common'
import { useLoading } from '@/hooks'
import { UiSkeleton } from '@/ui'

import ListCard from './ListCard'
import ListCardSkeleton from './ListCardSkeleton'

interface Props extends StackProps {
  filter: OrgsRequestFiltersMap
}

type loadListResponseType = {
  data: Organization[]
  meta: JsonApiDefaultMeta
}

const ORGS_IN_PAGE_DEFAULT_LIMIT_ = 4

export default function List({ filter, ...rest }: Props) {
  const { spacing } = useTheme()
  const [page, setPage] = useState({
    [OrgsRequestPage.Number]: 0,
    [OrgsRequestPage.Limit]: ORGS_IN_PAGE_DEFAULT_LIMIT_,
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
  } = useLoading<loadListResponseType>({} as loadListResponseType, loadList, {
    loadArgs: [filter, page],
    loadOnMount: true,
  })

  useEffect(() => {
    if (filter[OrgsRequestFilters.MetaData] !== prevStateMetaData) {
      setPage(prevState => ({
        ...prevState,
        //Todo: change the page to 1 when the API is ready
        [OrgsRequestPage.Number]: 0,
      }))
      setPrevStateMetaData(filter[OrgsRequestFilters.MetaData])
    }
  }, [filter, prevStateMetaData])

  return (
    <Stack {...rest}>
      {isLoading ? (
        <>
          <Grid container spacing={6}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Grid key={idx} item xs={6}>
                <ListCardSkeleton />
              </Grid>
            ))}
          </Grid>
          <Stack alignItems='center' mt={6}>
            <UiSkeleton variant='rounded' height={spacing(6)} width={spacing(80)} />
          </Stack>
        </>
      ) : isLoadingError ? (
        <></>
      ) : isEmpty ? (
        <></>
      ) : (
        <>
          <Grid container spacing={6} minHeight={spacing(130)}>
            {orgList.map(org => (
              <Grid key={org.id} item xs={6}>
                <ListCard org={org} />
              </Grid>
            ))}
          </Grid>
          {/*Todo: remove increment when the API is ready*/}
          <PageListPagination
            page={page[OrgsRequestPage.Number] + 1}
            count={Math.ceil(meta?.count / ORGS_IN_PAGE_DEFAULT_LIMIT_) ?? 0}
            onChange={page =>
              setPage(prevState => ({
                ...prevState,
                [OrgsRequestPage.Number]: page - 1,
              }))
            }
          />
        </>
      )}
    </Stack>
  )
}

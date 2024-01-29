import { JsonApiResponseLinks } from '@distributedlab/jac'
import { Grid, Skeleton, Stack, StackProps, useTheme } from '@mui/material'
import { useCallback, useState } from 'react'

import { loadOrgs, Organization, type OrgsRequestFiltersMap, OrgsRequestPage } from '@/api'
import { PageListPagination } from '@/common'
import { useLoading } from '@/hooks'

import ListCard from './ListCard'

interface Props extends StackProps {
  filter: OrgsRequestFiltersMap
}

const DEFAULT_LIMIT = 4

export default function List({ filter, ...rest }: Props) {
  const { spacing, palette } = useTheme()
  const [page, setPage] = useState({
    [OrgsRequestPage.Number]: 0,
    [OrgsRequestPage.Limit]: DEFAULT_LIMIT,
  })

  const loadList = useCallback(async () => {
    return loadOrgs({ filter, page })
  }, [filter, page])

  const {
    data: { data: orgList, meta },
    isLoading,
    isLoadingError,
    isEmpty,
  } = useLoading<{ data: Organization[]; links: JsonApiResponseLinks }>({}, loadList, {
    loadArgs: [filter, page],
    loadOnMount: true,
  })

  return (
    <Stack {...rest}>
      {isLoading ? (
        <>
          <Grid container spacing={6}>
            {Array.from({ length: 4 }).map((_, idx) => (
              <Grid key={idx} item xs={6}>
                <Skeleton
                  variant='rounded'
                  animation='wave'
                  sx={{ bgcolor: palette.divider, borderRadius: 3 }}
                  height={spacing(60)}
                />
              </Grid>
            ))}
          </Grid>
          <Stack alignItems='center' mt={6}>
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{ bgcolor: palette.divider, width: spacing(80) }}
              height={spacing(6)}
            />
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
          <PageListPagination
            page={page[OrgsRequestPage.Number] + 1}
            count={Math.ceil(meta?.count / DEFAULT_LIMIT) ?? 0}
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

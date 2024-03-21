import { Button, Stack } from '@mui/material'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink } from 'react-router-dom'

import { loadOrgsCount, OrgsRequestFilters, OrgsRequestFiltersMap } from '@/api/modules/orgs'
import { PageListFilters, PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useLoading, useNestedRoutes } from '@/hooks'
import { useIdentityState } from '@/store'

import { List } from './components'

export default function OrgsList() {
  const { t } = useTranslation()
  const { userDid } = useIdentityState()

  const [filter, setFilter] = useState<OrgsRequestFiltersMap>({})

  const routes = useNestedRoutes(RoutePaths.OrgsList, [
    {
      index: true,
      element: <Navigate replace to={RoutePaths.OrgsListAll} />,
    },
    {
      path: RoutePaths.OrgsListAll,
      element: (
        <List
          filter={{
            ...filter,
          }}
        />
      ),
    },
    {
      path: RoutePaths.OrgsListMy,
      element: (
        <List
          filter={{
            ...filter,

            [OrgsRequestFilters.UserDid]: userDid,
          }}
        />
      ),
    },
  ])

  const init = useCallback(async () => {
    return loadOrgsCount()
  }, [])

  const { data: orgsCount } = useLoading<number | undefined>(undefined, init, {
    loadOnMount: true,
  })

  return (
    <Stack flex={1} spacing={6}>
      <PageTitles title={t('org-list.title')} />
      <PageListFilters
        tabs={[
          {
            label: `All${orgsCount ? ` (${orgsCount})` : ''}`,
            route: RoutePaths.OrgsListAll,
          },
          {
            label: 'My',
            route: RoutePaths.OrgsListMy,
          },
        ]}
        onSearchInput={(value: string) =>
          setFilter(prev => ({
            ...prev,

            [OrgsRequestFilters.Metadata]: value,
          }))
        }
        actionBar={
          <NavLink to={RoutePaths.OrgsNew}>
            <Button variant='contained' color='primary' size='medium'>
              Create
            </Button>
          </NavLink>
        }
      />

      <Stack flex={1}>{routes}</Stack>
    </Stack>
  )
}

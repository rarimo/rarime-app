import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { loadOrgsAmount, OrgsRequestFilters, OrgsRequestFiltersMap } from '@/api'
import { PageListFilters, PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useNestedRoutes } from '@/helpers'
import { useLoading } from '@/hooks'
import { UiButton, UiIcon, UiSwitch } from '@/ui'

import { List } from './components'

export default function Orgs() {
  const { t } = useTranslation()

  const [filter, setFilter] = useState<OrgsRequestFiltersMap>({})
  const routes = useNestedRoutes(RoutePaths.Orgs, [
    {
      path: RoutePaths.OrgsAll,
      element: (
        <List
          filter={{
            ...filter,
          }}
        />
      ),
    },
    {
      path: RoutePaths.OrgsMy,
      element: (
        <List
          filter={{
            ...filter,

            /**
             * FIXME: get userDid from {@link useMetamaskZkpSnapContext}
             */
            [OrgsRequestFilters.UserDid]: 'did:iden3:readonly:blabla',
          }}
        />
      ),
    },
  ])

  const init = useCallback(async () => {
    const { data } = await loadOrgsAmount()

    return data
  }, [])

  const { data: orgsAmount } = useLoading<number | undefined>(undefined, init, {
    loadOnMount: true,
  })

  return (
    <Stack flex={1} gap={6}>
      <PageTitles title={t('org-list.title')} subtitle={t('org-list.subtitle')} />
      <PageListFilters
        tabs={[
          {
            label: `All${orgsAmount ? ` (${orgsAmount})` : ''}`,
            route: RoutePaths.OrgsAll,
          },
          {
            label: 'My Organizations',
            route: RoutePaths.OrgsMy,
          },
        ]}
        onSearchInput={(value: string) =>
          setFilter(prev => ({
            ...prev,

            // FIXME: remove this and add searching orgs by name in backend
            [OrgsRequestFilters.UserDid]: value,
          }))
        }
        actionBar={
          <Stack direction='row' gap={4} justifyContent='space-between'>
            <UiSwitch label='Show Only active' />

            <NavLink to={RoutePaths.OrgsNew}>
              <UiButton
                variant='contained'
                color='primary'
                startIcon={<UiIcon componentName='add' />}
              >
                New Organization
              </UiButton>
            </NavLink>
          </Stack>
        }
      />

      <Stack flex={1}>{routes}</Stack>
    </Stack>
  )
}

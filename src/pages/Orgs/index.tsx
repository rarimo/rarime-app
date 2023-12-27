import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import { loadOrgsAmount, OrgsRequestFilters, OrgsRequestFiltersMap } from '@/api'
import { PageListFilters, PageTitles } from '@/common'
import { Routes as RoutesPaths } from '@/enums'
import { useLoading } from '@/hooks'
import { UiButton, UiIcon, UiSwitch } from '@/ui'

import { List } from './components'

enum OrgsRoutes {
  All = 'all',
  My = 'my',
}

export default function Orgs() {
  const { t } = useTranslation()

  const [filter, setFilter] = useState<OrgsRequestFiltersMap>({})

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
            route: OrgsRoutes.All,
          },
          {
            label: 'My Organizations',
            route: OrgsRoutes.My,
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

            <NavLink to={RoutesPaths.OrgNew}>
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

      <Stack flex={1}>
        <Routes>
          <Route
            path={OrgsRoutes.All}
            element={
              <List
                filter={{
                  ...filter,
                }}
              />
            }
          />
          <Route
            path={OrgsRoutes.My}
            element={
              <List
                filter={{
                  ...filter,

                  /**
                   * FIXME: get userDid from {@link useMetamaskZkpSnapContext}
                   */
                  [OrgsRequestFilters.UserDid]: 'did:iden3:readonly:blabla',
                }}
              />
            }
          />

          <Route path='*' element={<Navigate replace to={OrgsRoutes.All} />} />
        </Routes>
      </Stack>
    </Stack>
  )
}

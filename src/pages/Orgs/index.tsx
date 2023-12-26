import { Stack } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'

import { PageListFilters, PageTitles } from '@/common'
import { Routes as RoutesPaths } from '@/enums'
import { UiButton, UiIcon, UiSwitch } from '@/ui'

import List from './List'

export default function Orgs() {
  const { t } = useTranslation()

  const [filters, setFilters] = useState({})

  return (
    <Stack flex={1} gap={6}>
      <PageTitles title={t('org-list.title')} subtitle={t('org-list.subtitle')} />
      <PageListFilters
        tabs={[
          {
            label: 'All',
            route: 'all',
          },
          {
            label: 'My Organizations',
            route: 'mine',
          },
        ]}
        onSearchInput={(value: string) => setFilters(value)}
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
            path='all'
            element={
              <List
                filters={{
                  ...filters,
                  content: 'All',
                }}
              />
            }
          />
          <Route
            path='mine'
            element={
              <List
                filters={{
                  ...filters,
                  content: 'Mine',
                }}
              />
            }
          />

          <Route path='*' element={<Navigate replace to='all' />} />
        </Routes>
      </Stack>
    </Stack>
  )
}

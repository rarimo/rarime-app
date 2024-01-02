import { Stack } from '@mui/material'
import { trimEnd } from 'lodash'
import { useCallback, useState } from 'react'
import { generatePath, Navigate, NavLink } from 'react-router-dom'

import {
  loadOrgGroupRequestsCount,
  OrgGroupRequestFilters,
  OrgGroupRequestFiltersMap,
  OrgGroupRequestStatuses,
} from '@/api'
import { PageListFilters, PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useLoading, useNestedRoutes } from '@/hooks'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { useOrgGroupDetails } from '@/pages/Orgs/pages/OrgsId/pages/OrgGroups/hooks'
import { UiButton, UiIcon } from '@/ui'

import { List } from './components'

export default function OrgGroupsId() {
  const { org } = useOrgDetails()
  const { orgGroup } = useOrgGroupDetails()

  const [filter, setFilter] = useState<OrgGroupRequestFiltersMap>({} as OrgGroupRequestFiltersMap)

  const routes = useNestedRoutes(
    generatePath(RoutePaths.OrgsIdGroupsIdList, {
      id: org.id,
      groupId: orgGroup.id,
    }),
    [
      {
        index: true,
        element: (
          <Navigate
            replace
            to={generatePath(RoutePaths.OrgsIdGroupsIdListStatusSubmitted, {
              groupId: orgGroup.id,
              id: org.id,
            })}
          />
        ),
      },
      {
        path: generatePath(RoutePaths.OrgsIdGroupsIdListStatusSubmitted, {
          groupId: orgGroup.id,
          id: org.id,
        }),
        element: (
          <List
            filter={{
              ...filter,

              [OrgGroupRequestFilters.Status]: OrgGroupRequestStatuses.Submitted,
            }}
          />
        ),
      },

      {
        path: generatePath(RoutePaths.OrgsIdGroupsIdListStatusCreated, {
          groupId: orgGroup.id,
          id: org.id,
        }),
        element: (
          <List
            filter={{
              ...filter,

              [OrgGroupRequestFilters.Status]: OrgGroupRequestStatuses.Created,
            }}
          />
        ),
      },

      {
        path: generatePath(RoutePaths.OrgsIdGroupsIdListStatusFilled, {
          groupId: orgGroup.id,
          id: org.id,
        }),
        element: (
          <List
            filter={{
              ...filter,

              [OrgGroupRequestFilters.Status]: OrgGroupRequestStatuses.Filled,
            }}
          />
        ),
      },
    ],
  )

  const loadRequestCounts = useCallback(async () => {
    return loadOrgGroupRequestsCount(org.id, orgGroup.id)
  }, [orgGroup.id, org.id])

  const { data: reqsCount } = useLoading<Record<OrgGroupRequestStatuses, number> | null>(
    null,
    loadRequestCounts,
    {
      loadOnMount: true,
    },
  )

  return (
    <Stack flex={1}>
      <PageTitles
        title={`Employer in the area`}
        subtitle='a person, company, or organization that pays people to work for them: The Air Force is the largest employer in this area.'
      />

      <PageListFilters
        tabs={[
          {
            label: trimEnd(`Issued ${reqsCount?.[OrgGroupRequestStatuses.Submitted]}`),
            route: generatePath(RoutePaths.OrgsIdGroupsIdListStatusSubmitted, {
              groupId: orgGroup.id,
              id: org.id,
            }),
          },
          {
            label: trimEnd(`Pending ${reqsCount?.[OrgGroupRequestStatuses.Created]}`),
            route: generatePath(RoutePaths.OrgsIdGroupsIdListStatusCreated, {
              groupId: orgGroup.id,
              id: org.id,
            }),
          },
          {
            label: trimEnd(`Filled ${reqsCount?.[OrgGroupRequestStatuses.Filled]}`),
            route: generatePath(RoutePaths.OrgsIdGroupsIdListStatusFilled, {
              groupId: orgGroup.id,
              id: org.id,
            }),
          },
        ]}
        onSearchInput={(value: string) =>
          setFilter(prev => ({
            ...(prev || {}),

            // FIXME: remove this and add searching orgs by name in backend
            [OrgGroupRequestFilters.UserDid]: value,
          }))
        }
        actionBar={
          <Stack direction='row' gap={4} justifyContent='space-between'>
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

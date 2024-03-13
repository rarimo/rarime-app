import { Stack } from '@mui/material'
import trimEnd from 'lodash/trimEnd'
import { useCallback, useMemo, useState } from 'react'
import { generatePath, Navigate } from 'react-router-dom'

import {
  loadOrgGroupRequestsCount,
  OrgGroupRequestFilters,
  OrgGroupRequestFiltersMap,
  OrgGroupRequestStatuses,
} from '@/api/modules/orgs'
import { PageListFilters, PageTitles } from '@/common'
import { RoutePaths } from '@/enums'
import { useLoading, useNestedRoutes } from '@/hooks'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'
import { useOrgGroupDetails } from '@/pages/Orgs/pages/OrgsId/pages/OrgGroups/hooks'
import { UiButton, UiDrawer, UiIcon } from '@/ui'

import { InviteMemberForm, List } from './components'

export default function OrgGroupsId() {
  const { org } = useOrgDetails()
  const { orgGroup } = useOrgGroupDetails()

  const [filter, setFilter] = useState<OrgGroupRequestFiltersMap>({} as OrgGroupRequestFiltersMap)

  const [isInviteDrawerShown, setIsInviteDrawerShown] = useState(false)

  const routes = useNestedRoutes(RoutePaths.OrgsIdGroupsIdList, [
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
      path: RoutePaths.OrgsIdGroupsIdListStatusSubmitted,
      element: (
        <List
          key={OrgGroupRequestStatuses.Submitted}
          filter={{
            ...filter,

            [OrgGroupRequestFilters.Status]: [
              OrgGroupRequestStatuses.Submitted,
              OrgGroupRequestStatuses.Approved,
            ],
          }}
        />
      ),
    },

    {
      path: RoutePaths.OrgsIdGroupsIdListStatusCreated,
      element: (
        <List
          key={OrgGroupRequestStatuses.Created}
          filter={{
            ...filter,

            [OrgGroupRequestFilters.Status]: [OrgGroupRequestStatuses.Created],
          }}
        />
      ),
    },

    {
      path: RoutePaths.OrgsIdGroupsIdListStatusFilled,
      element: (
        <List
          key={OrgGroupRequestStatuses.Filled}
          filter={{
            ...filter,

            [OrgGroupRequestFilters.Status]: [OrgGroupRequestStatuses.Filled],
          }}
        />
      ),
    },
  ])

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

  // memberInvite: OrgGroupCreatedRequest
  const handleMemberInvitationCreated = useCallback(() => {
    setIsInviteDrawerShown(false)
    // TODO: update requests list
  }, [])

  const filterTabs = useMemo(() => {
    const submittedCount = reqsCount?.[OrgGroupRequestStatuses.Submitted] ?? 0
    const createdCount = reqsCount?.[OrgGroupRequestStatuses.Created] ?? 0
    const filledCount = reqsCount?.[OrgGroupRequestStatuses.Filled] ?? 0

    return [
      {
        label: trimEnd(`Issued (${submittedCount})`),
        route: generatePath(RoutePaths.OrgsIdGroupsIdListStatusSubmitted, {
          groupId: orgGroup.id,
          id: org.id,
        }),
      },
      {
        label: trimEnd(`Pending (${createdCount})`),
        route: generatePath(RoutePaths.OrgsIdGroupsIdListStatusCreated, {
          groupId: orgGroup.id,
          id: org.id,
        }),
      },
      {
        label: trimEnd(`Filled (${filledCount})`),
        route: generatePath(RoutePaths.OrgsIdGroupsIdListStatusFilled, {
          groupId: orgGroup.id,
          id: org.id,
        }),
      },
    ]
  }, [org.id, orgGroup.id, reqsCount])

  return (
    <Stack flex={1}>
      <PageTitles
        title='Employer in the area'
        subtitle='a person, company, or organization that pays people to work for them: The Air Force is the largest employer in this area.'
      />

      <PageListFilters
        tabs={filterTabs}
        onSearchInput={(value: string) =>
          setFilter(prev => ({
            ...(prev || {}),

            // FIXME: remove this and add searching orgs by name in backend
            [OrgGroupRequestFilters.UserDid]: value,
          }))
        }
        actionBar={
          <Stack direction='row' spacing={4} justifyContent='space-between'>
            <UiButton
              variant='contained'
              color='primary'
              startIcon={<UiIcon componentName='accountCircle' />}
              sx={{ ml: 'auto' }}
              onClick={() => setIsInviteDrawerShown(true)}
            >
              Invite Member
            </UiButton>
          </Stack>
        }
      />
      <Stack flex={1}>{routes}</Stack>

      <UiDrawer open={isInviteDrawerShown} onClose={() => setIsInviteDrawerShown(false)}>
        <InviteMemberForm
          onMemberInvitationCreated={handleMemberInvitationCreated}
          maxWidth={theme => theme.spacing(100)}
          p={6}
        />
      </UiDrawer>
    </Stack>
  )
}

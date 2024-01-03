import { createContext, ReactNode, useMemo } from 'react'
import { generatePath, useParams } from 'react-router-dom'

import { type Organization, OrgGroup, useOrg } from '@/api'
import { useOrgGroups } from '@/api/modules/orgs/hooks/org-groups'
import { RoutePaths } from '@/enums'
import { UiNavTabs } from '@/ui'

interface OrgDetailsContextValue {
  org: Organization
  orgGroups: OrgGroup[]
  isOrgOwner?: boolean

  orgTabs?: ReactNode
}

export const OrgDetailsContext = createContext<OrgDetailsContextValue>({} as OrgDetailsContextValue)

export const OrgDetailsContextProvider = ({ children }: { children: ReactNode }) => {
  const { id = null } = useParams<{ id: string }>()

  const {
    org,
    isOrgOwner,
    isLoadingError: orgIsLoadingError,
    isEmpty: isOrgEmpty,
  } = useOrg(id ?? '')

  // FIXME: isAdminOnly?
  const {
    orgGroups,
    isLoading: isOrgGroupsLoading,
    isLoadingError: orgGroupsIsLoadingError,
  } = useOrgGroups((isOrgOwner && id) || '')

  const isLoadingError = useMemo(
    () => orgIsLoadingError || orgGroupsIsLoadingError,
    [orgGroupsIsLoadingError, orgIsLoadingError],
  )

  const orgTabs = useMemo(
    () =>
      org ? (
        <UiNavTabs
          tabs={[
            {
              label: 'Public',
              route: generatePath(RoutePaths.OrgsId, { id: org.id }),
              isExact: true,
            },
            {
              label: 'Private',
              route: generatePath(RoutePaths.OrgsIdGroups, { id: org.id }),
            },
          ]}
        />
      ) : (
        <></>
      ),
    [org],
  )

  // TODO: add error message
  if (isLoadingError) return <></>

  // TODO: add no data message
  if (isOrgEmpty || !org || isOrgGroupsLoading) return <></>

  return (
    <OrgDetailsContext.Provider value={{ org, orgGroups, isOrgOwner, orgTabs }}>
      {children}
    </OrgDetailsContext.Provider>
  )
}

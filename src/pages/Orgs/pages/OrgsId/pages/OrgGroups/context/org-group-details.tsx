import { createContext, ReactNode, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { OrgGroup } from '@/api/modules/orgs'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'

interface OrgGroupDetailsContextValue {
  orgGroup: OrgGroup
}

export const OrgGroupDetailsContext = createContext<OrgGroupDetailsContextValue>({
  orgGroup: {} as OrgGroup,
})

export const OrgGroupDetailsContextProvider = ({ children }: { children: ReactNode }) => {
  const { orgGroups } = useOrgDetails()

  const { groupId } = useParams<{ groupId: string }>()

  const orgGroup = useMemo(
    () => orgGroups.find(orgGroup => orgGroup.id === groupId),
    [groupId, orgGroups],
  )

  // TODO: add no data message
  if (!orgGroup) return <></>

  return (
    <OrgGroupDetailsContext.Provider
      value={{
        orgGroup,
      }}
    >
      {children}
    </OrgGroupDetailsContext.Provider>
  )
}

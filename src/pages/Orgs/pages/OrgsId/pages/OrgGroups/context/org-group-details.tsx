import { createContext, ReactNode, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { OrgGroup } from '@/api'
import { useOrgDetails } from '@/pages/Orgs/pages/OrgsId/hooks'

interface OrgGroupDetailsContextValue {
  orgGroup: OrgGroup
}

export const OrgGroupDetailsContext = createContext<OrgGroupDetailsContextValue>({
  orgGroup: {} as OrgGroup,
})

export const OrgGroupDetailsContextProvider = ({ children }: { children: ReactNode }) => {
  const { orgGroups } = useOrgDetails()

  const params = useParams<{ groupId: string }>()
  // FIXME: group id not in the params
  const { groupId } = useParams<{ groupId: string }>()

  console.log('groupId', params)

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

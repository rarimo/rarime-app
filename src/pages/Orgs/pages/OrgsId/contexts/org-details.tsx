import { createContext, ReactNode } from 'react'
import { useParams } from 'react-router-dom'

import { type Organization, useOrg } from '@/api'

interface OrgDetailsContextValue {
  org?: Organization
  isAccountOwner?: boolean
}

export const OrgDetailsContext = createContext<OrgDetailsContextValue>({} as OrgDetailsContextValue)

export const OrgDetailsContextProvider = ({ children }: { children: ReactNode }) => {
  const { id = null } = useParams<{ id: string }>()

  const { org, isAccountOwner } = useOrg(id ?? '')

  return (
    <OrgDetailsContext.Provider value={{ org, isAccountOwner }}>
      {children}
    </OrgDetailsContext.Provider>
  )
}

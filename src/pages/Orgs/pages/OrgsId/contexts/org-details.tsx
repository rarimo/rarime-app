import { createContext, ReactNode } from 'react'
import { useParams } from 'react-router-dom'

import { type Organization, useOrg } from '@/api'

interface OrgDetailsContextValue {
  org: Organization
  isAccountOwner?: boolean
}

export const OrgDetailsContext = createContext<OrgDetailsContextValue>({} as OrgDetailsContextValue)

export const OrgDetailsContextProvider = ({ children }: { children: ReactNode }) => {
  const { id = null } = useParams<{ id: string }>()

  const { org, isAccountOwner, isLoading, isLoadingError, isEmpty } = useOrg(id ?? '')

  // TODO: add proper loader
  if (isLoading) return 'Loading...'

  // TODO: add proper error message
  if (isLoadingError) return 'Loading error'

  // TODO: add no data message
  if (isEmpty || !org) return 'No data'

  return (
    <OrgDetailsContext.Provider value={{ org, isAccountOwner }}>
      {children}
    </OrgDetailsContext.Provider>
  )
}

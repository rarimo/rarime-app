import { useContext } from 'react'

import { OrgDetailsContext } from '@/pages/Orgs/pages/OrgsId/contexts'

export const useOrgDetails = () => {
  const orgDetailsContextValue = useContext(OrgDetailsContext)

  return {
    ...orgDetailsContextValue,
  }
}

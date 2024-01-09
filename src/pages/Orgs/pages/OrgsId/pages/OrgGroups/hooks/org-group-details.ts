import { useContext } from 'react'

import { OrgGroupDetailsContext } from '@/pages/Orgs/pages/OrgsId/pages/OrgGroups/context/org-group-details'

export const useOrgGroupDetails = () => {
  const orgGroupDetails = useContext(OrgGroupDetailsContext)

  return {
    ...orgGroupDetails,
  }
}

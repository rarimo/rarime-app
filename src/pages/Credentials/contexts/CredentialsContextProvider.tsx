import { CircularProgress } from '@mui/material'
import { createContext, PropsWithChildren, useContext } from 'react'

import { zkpSnap } from '@/api/clients'
import {
  groupVCsToOrgGroups,
  loadRequestsByUserDid,
  OrgGroupRequestWithClaims,
  OrgGroupVCMap,
} from '@/api/modules/orgs'
import { useLoading } from '@/hooks'
import { useIdentityState } from '@/store'

type CredentialsContextValue = {
  orgGroupRequests: OrgGroupRequestWithClaims[]
  groupedVCs: OrgGroupVCMap
}

const CredentialsContext = createContext<CredentialsContextValue>({
  orgGroupRequests: [],
  groupedVCs: [],
})

export const CredentialsContextProvider = ({ children }: PropsWithChildren) => {
  // TODO:
  //  load all submitted and created requests
  //  load, parse and filter all credentials loaded from snap

  const { userDid } = useIdentityState()

  const {
    data: { orgGroupRequests, groupedVCs },
    isLoading,
    isLoadingError,
  } = useLoading<{
    orgGroupRequests: OrgGroupRequestWithClaims[]
    groupedVCs: OrgGroupVCMap
  }>(
    {
      orgGroupRequests: [],
      groupedVCs: [],
    },
    async () => {
      {
        const [orgGroupRequests, vcs] = await Promise.all([
          loadRequestsByUserDid(userDid),
          zkpSnap.getCredentials(),
        ])

        const groupedVCs = groupVCsToOrgGroups(orgGroupRequests, vcs)

        return { orgGroupRequests, groupedVCs }
      }
    },
    {
      loadOnMount: !!userDid,
      loadArgs: [userDid],
    },
  )

  if (isLoading) return <CircularProgress color={'secondary'} />

  if (isLoadingError) return <></>

  return (
    <CredentialsContext.Provider
      value={{
        orgGroupRequests,
        groupedVCs,
      }}
    >
      {children}
    </CredentialsContext.Provider>
  )
}

export const useCredentialsContext = () => {
  return {
    ...useContext(CredentialsContext),
  }
}

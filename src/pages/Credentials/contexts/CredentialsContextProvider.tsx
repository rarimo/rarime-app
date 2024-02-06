import { CircularProgress } from '@mui/material'
import { W3CCredential } from '@rarimo/rarime-connector'
import { createContext, PropsWithChildren, useContext } from 'react'

import {
  groupVCsToOrgGroups,
  loadRequestsByUserDid,
  OrgGroupRequestWithClaims,
  OrgGroupVCMap,
} from '@/api/modules/orgs'
import { useLoading, useMetamaskZkpSnapContext } from '@/hooks'

type CredentialsContextValue = {
  vcs: W3CCredential[]
  orgGroupRequests: OrgGroupRequestWithClaims[]
  groupedVCs: OrgGroupVCMap
}

const CredentialsContext = createContext<CredentialsContextValue>({
  vcs: [],
  orgGroupRequests: [],
  groupedVCs: [],
})

export const CredentialsContextProvider = ({ children }: PropsWithChildren) => {
  // TODO:
  //  load all submitted and created requests
  //  load, parse and filter all credentials loaded from snap

  const { userDid, getCredentials } = useMetamaskZkpSnapContext()

  const {
    data: { vcs, orgGroupRequests, groupedVCs },
    isLoading,
    isLoadingError,
  } = useLoading<{
    vcs: W3CCredential[]
    orgGroupRequests: OrgGroupRequestWithClaims[]
    groupedVCs: OrgGroupVCMap
  }>(
    {
      vcs: [],
      orgGroupRequests: [],
      groupedVCs: [],
    },
    async () => {
      {
        const [orgGroupRequests, vcs] = await Promise.all([
          loadRequestsByUserDid(userDid),
          getCredentials(),
        ])

        const groupedVCs = groupVCsToOrgGroups(orgGroupRequests, vcs)

        return { vcs, orgGroupRequests, groupedVCs }
      }
    },
    {
      loadOnMount: !!userDid,
      loadArgs: [getCredentials, userDid],
    },
  )

  if (isLoading) return <CircularProgress color={'secondary'} />

  if (isLoadingError) return <></>

  return (
    <CredentialsContext.Provider
      value={{
        vcs,
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

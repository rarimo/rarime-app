import { CircularProgress } from '@mui/material'
import { createContext, PropsWithChildren, useContext } from 'react'

import {
  getMetadataBatch,
  groupVCsToOrgGroups,
  loadOrgGroupRequests,
  OrgGroupRequest,
  OrgGroupRequestFilters,
  OrgGroupRequestStatuses,
  OrgGroupVCMap,
} from '@/api/modules/orgs'
import { useLoading, useMetamaskZkpSnapContext } from '@/hooks'

type CredentialsContextValue = {
  orgGroupRequests: OrgGroupRequest[]
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

  const { userDid, getCredentials } = useMetamaskZkpSnapContext()

  const {
    data: { orgGroupRequests, groupedVCs },
    isLoading,
    isLoadingError,
  } = useLoading<{
    orgGroupRequests: OrgGroupRequest[]
    groupedVCs: OrgGroupVCMap
  }>(
    {
      orgGroupRequests: [],
      groupedVCs: [],
    },
    async () => {
      {
        const [orgGroupRequests, vcs] = await Promise.all([
          // TODO: replace with new endpoint to get all user's requests by his did
          loadOrgGroupRequests({
            filter: {
              [OrgGroupRequestFilters.UserDid]: userDid,
              [OrgGroupRequestFilters.Status]: [
                OrgGroupRequestStatuses.Submitted,
                OrgGroupRequestStatuses.Created,
              ],
            },
          }),
          getCredentials(),
        ])

        const metadatas = await getMetadataBatch(vcs)

        const groupedVCs = groupVCsToOrgGroups(metadatas, vcs)

        return { orgGroupRequests, groupedVCs }
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

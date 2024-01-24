import { CircularProgress } from '@mui/material'
import { W3CCredential } from '@rarimo/rarime-connector'
import { createContext, PropsWithChildren, useCallback, useContext } from 'react'

import {
  loadOrgGroupRequests,
  OrgGroupRequest,
  OrgGroupRequestFilters,
  OrgGroupRequestStatuses,
} from '@/api'
import { useLoading, useMetamaskZkpSnapContext } from '@/hooks'

type CredentialsContextValue = {
  orgGroupRequests: OrgGroupRequest[]
  vcs: W3CCredential[]
}

const CredentialsContext = createContext<CredentialsContextValue>({
  orgGroupRequests: [],
  vcs: [],
})

export const CredentialsContextProvider = ({ children }: PropsWithChildren) => {
  // TODO:
  //  load all submitted and created requests
  //  load, parse and filter all credentials loaded from snap

  const { userDid, getCredentials } = useMetamaskZkpSnapContext()

  const loadCredentialsAndRequests = useCallback(async (): Promise<{
    orgGroupRequests: OrgGroupRequest[]
    vcs: W3CCredential[]
  }> => {
    const [orgGroupRequests, vcs] = await Promise.all([
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

    return { orgGroupRequests, vcs }
  }, [getCredentials, userDid])

  const {
    data: { orgGroupRequests, vcs },
    isLoading,
    isLoadingError,
  } = useLoading<{
    orgGroupRequests: OrgGroupRequest[]
    vcs: W3CCredential[]
  }>(
    {
      orgGroupRequests: [],
      vcs: [],
    },
    loadCredentialsAndRequests,
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
        vcs,
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

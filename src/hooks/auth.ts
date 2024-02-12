import { PROVIDERS } from '@distributedlab/w3p'
import { useCallback, useMemo } from 'react'

import { initZkpSnap, zkpSnap } from '@/api/clients'
import { authorizeUser } from '@/api/modules/auth'
import { OrgUserRoles } from '@/api/modules/orgs'
import { buildAuthorizeRequest, getClaimOffer } from '@/api/modules/zkp'
import { useWeb3Context } from '@/hooks/web3'
import { identityStore, useIdentityState, web3Store } from '@/store'

// TODO: add jwt validations for specific org
export const useAuth = () => {
  const { init, provider } = useWeb3Context()

  const { userDid } = useIdentityState()

  const isAuthorized = useMemo(
    () => Boolean(provider?.isConnected && userDid),
    [provider?.isConnected, userDid],
  )

  const logout = useCallback(async () => {
    await provider?.disconnect()
    await web3Store.checkSnapStatus()

    web3Store.setProviderType(undefined)
  }, [provider])

  const connectProviders = useCallback(
    async (providerType?: PROVIDERS) => {
      const currentProviderType = providerType || web3Store.providerType

      web3Store.setProviderType(currentProviderType)

      if (!currentProviderType) return

      await init(currentProviderType)

      await initZkpSnap()

      await web3Store.checkSnapStatus()

      return identityStore.createIdentity()
    },
    [init],
  )

  const authorize = useCallback(
    async ({
      claimId,
      orgId,
      groupId,
      role,
    }: {
      claimId: string
      orgId: string
      groupId: string
      role: OrgUserRoles
    }) => {
      const claimOffer = await getClaimOffer(userDid, claimId)

      const vc = await zkpSnap.saveCredentials(claimOffer)

      if (!vc?.[0]?.issuer) throw new TypeError('VC issuer is undefined')

      if (!provider?.address) throw new TypeError('Provider address is undefined')

      // FIXME: define in zkp module
      const proofResponse = await zkpSnap.createProof(
        buildAuthorizeRequest({
          providerAddress: provider?.address,
          isAdmin: false, // TODO: add check for admin role from VC
        }),
      )

      if (!proofResponse?.zkpProof) throw new TypeError('Proof is undefined')

      return authorizeUser({
        role,
        orgDid: orgId,
        groupId: groupId,
        userDid: userDid,
        zkProof: proofResponse.zkpProof,
      })
    },
    [provider?.address, userDid],
  )

  return {
    isAuthorized,

    connectProviders,
    logout,

    authorize,
  }
}

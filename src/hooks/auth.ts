import { useCallback, useMemo } from 'react'

import { zkpSnap } from '@/api/clients'
import { authorizeUser } from '@/api/modules/auth'
import { OrgUserRoles } from '@/api/modules/orgs'
import { buildAuthorizeRequest, getClaimOffer } from '@/api/modules/zkp'
import { identityStore, useIdentityState, useWeb3State, web3Store } from '@/store'

// TODO: add jwt validations for specific org
export const useAuth = () => {
  const { userDid } = useIdentityState()
  const { provider, isSnapInstalled } = useWeb3State()

  const isAuthorized = useMemo(
    () => Boolean(userDid && isSnapInstalled),
    [isSnapInstalled, userDid],
  )

  const logout = useCallback(async () => {
    await web3Store.checkSnapStatus()

    provider?.disconnect()
  }, [provider])

  const connectProviders = useCallback(async () => {
    await zkpSnap.enable()

    await web3Store.checkSnapStatus()

    return identityStore.getIdentity()
  }, [])

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

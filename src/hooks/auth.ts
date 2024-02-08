import { useCallback, useMemo } from 'react'

import { authorizeUser } from '@/api/modules/auth'
import { OrgUserRoles } from '@/api/modules/orgs'
import { buildAuthorizeRequest, getClaimOffer } from '@/api/modules/zkp'
import { useMetamaskZkpSnapContext } from '@/hooks/metamask-zkp-snap'
import { useWeb3Context } from '@/hooks/web3'
import { web3Store } from '@/store'

// TODO: add jwt validations for specific org
export const useAuth = () => {
  const { provider } = useWeb3Context()
  const {
    userDid,
    isSnapInstalled,

    createProof,

    saveVerifiableCredentials,
    connectOrInstallSnap,
    checkSnapStatus,
    checkSnapExists,
  } = useMetamaskZkpSnapContext()

  const isAuthorized = useMemo(
    () => Boolean(userDid && isSnapInstalled),
    [isSnapInstalled, userDid],
  )

  const logout = useCallback(async () => {
    await provider?.disconnect()
    await checkSnapStatus()

    web3Store.setProviderType(undefined)
  }, [checkSnapStatus, provider])

  const connectSnap = useCallback(async () => {
    await connectOrInstallSnap()

    await checkSnapExists()
    //Todo: add get identity, when snap is updated
  }, [checkSnapExists, connectOrInstallSnap])

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

      const vc = await saveVerifiableCredentials(claimOffer)

      if (!vc?.[0]?.issuer) throw new TypeError('VC issuer is undefined')

      if (!provider?.address) throw new TypeError('Provider address is undefined')

      // FIXME: define in zkp module
      const proofResponse = await createProof(
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
    [createProof, saveVerifiableCredentials, provider?.address, userDid],
  )

  return {
    isAuthorized,

    connectProviders: connectSnap,
    logout,

    authorize,
  }
}

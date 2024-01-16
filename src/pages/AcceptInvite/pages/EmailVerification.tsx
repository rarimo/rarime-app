import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { acceptInvitation } from '@/api'
import { useLoading, useMetamaskZkpSnapContext, useWeb3Context } from '@/hooks'

/**
 * run acceptInvitation
 * subscribe to authRoleClaim
 * saveCredential
 * generate proof
 * get jwt from auth-svc
 * redirect to fulfilling form
 * @constructor
 */
export default function EmailVerification() {
  const [searchParams] = useSearchParams()

  const { userDid, getVerifiableCredentials, createProof } = useMetamaskZkpSnapContext()
  const { provider } = useWeb3Context()

  const inviteDetails = useMemo<{
    group_id: string
    invite_email_id: string
    org_id: string
    otp: string
  }>(() => {
    try {
      return JSON.parse(atob(searchParams.get('q') || ''))
    } catch (error) {
      return null
    }
  }, [searchParams])

  const acceptInvite = useCallback(async () => {
    const createdRequest = await acceptInvitation({
      groupId: inviteDetails.group_id,
      orgId: inviteDetails.org_id,
      userDid: userDid,
      otp: inviteDetails.otp,
    })

    const claimOffer = await createdRequest.claim_id // TODO: get claimOffer from issuer admin api

    const vc = await getVerifiableCredentials(claimOffer)

    if (!vc?.[0]?.issuer) throw new TypeError('VC issuer is undefined')

    const proof = await createProof({
      circuitId: 'credentialAtomicQueryMTPV2',
      accountAddress: provider?.address,
      issuerDid: vc?.[0]?.issuer,

      query: {
        allowedIssuers: ['*'],
        credentialSubject: {
          isNatural: {
            $eq: 1,
          },
        },
        type: 'IdentityProviders',
      },
    })

    return getJwt(proof)
  }, [
    createProof,
    getVerifiableCredentials,
    inviteDetails.group_id,
    inviteDetails.org_id,
    inviteDetails.otp,
    provider?.address,
    userDid,
  ])

  const {
    data: jwt,
    isLoading,
    isLoadingError,
  } = useLoading('', acceptInvite, {
    loadOnMount: true,
  })

  if (isLoading) return <></>

  if (isLoadingError) return <></>

  return <></>
}

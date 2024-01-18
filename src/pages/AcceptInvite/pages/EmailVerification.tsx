import { useCallback, useMemo } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'

import { acceptInvitation } from '@/api'
import { RoutePaths } from '@/enums'
import { useAuth, useLoading, useMetamaskZkpSnapContext } from '@/hooks'
import { authStore } from '@/store'

export default function EmailVerification() {
  const [searchParams] = useSearchParams()

  const { userDid } = useMetamaskZkpSnapContext()
  const { authorize } = useAuth()

  const inviteDetails = useMemo<{
    group_id: string
    invite_email_id: string
    org_id: string
    otp: string
  }>(() => {
    try {
      // TODO: add searchParameter const
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

    const jwtTokens = await authorize({
      claimId: createdRequest.claim_id,
      orgId: inviteDetails.org_id,
      groupId: inviteDetails.group_id,
    })

    authStore.addToken(jwtTokens, inviteDetails.org_id, inviteDetails.group_id)

    return createdRequest
  }, [authorize, inviteDetails.group_id, inviteDetails.org_id, inviteDetails.otp, userDid])

  const {
    data: createdRequest,
    isLoading,
    isLoadingError,
  } = useLoading(null, acceptInvite, {
    loadOnMount: true,
    loadArgs: [inviteDetails],
  })

  const redirectPath = useMemo(() => {
    if (!createdRequest) return ''

    const params = new URLSearchParams()
    params.set('req_id', createdRequest.req_id)

    return `${RoutePaths.AcceptInviteFulfillRequest}${params.toString()}`
  }, [createdRequest])

  if (isLoading) return <></>

  if (isLoadingError) return <></>

  if (!redirectPath) return <></>

  return <Navigate to={redirectPath} />
}

import { useCallback, useMemo } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'

import { acceptInvitation, OrgUserRoles } from '@/api'
import { RoutePaths } from '@/enums'
import { useAuth, useLoading, useMetamaskZkpSnapContext } from '@/hooks'
import { authStore } from '@/store'

// DUMMY_INVITATION_LINK
// http://localhost:8095/i?q=eyJvcmdfaWQiOiJlZmM3MjhmMC0zMzEwLTQxOWEtODdlZi01ZTVlNDAyOGI4YzAiLCJncm91cF9pZCI6IjU0NGQxNmY0LWQ4YzMtNDYyYy05NjIxLWVjYzg3OTQ5NGQ0MSIsImludml0ZV9lbWFpbF9pZCI6IjVjMmFmZWIwLWRmYjYtNDdiNS1iNmE1LWQ1NmIzOTVkNmU5MyIsIm90cCI6IjEyMzQ1NiJ9

export default function EmailVerification() {
  const [searchParams] = useSearchParams()

  const { userDid } = useMetamaskZkpSnapContext()
  const { authorize } = useAuth()

  const invitationDetails = useMemo<{
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

  const authorizeAndGetCreatedRequest = useCallback(async () => {
    const createdRequest = await acceptInvitation({
      groupId: invitationDetails.group_id,
      orgId: invitationDetails.org_id,
      userDid: userDid,
      otp: invitationDetails.otp,
    })

    const jwtTokens = await authorize({
      claimId: createdRequest.claim_id,
      orgId: invitationDetails.org_id,
      groupId: invitationDetails.group_id,
      role: OrgUserRoles.Undefined,
    })

    authStore.addToken(jwtTokens, invitationDetails.org_id, invitationDetails.group_id)

    return createdRequest
  }, [
    authorize,
    invitationDetails.group_id,
    invitationDetails.org_id,
    invitationDetails.otp,
    userDid,
  ])

  const {
    data: createdRequest,
    isLoading,
    isLoadingError,
  } = useLoading(null, authorizeAndGetCreatedRequest, {
    loadOnMount: true,
    loadArgs: [invitationDetails],
  })

  const redirectPath = useMemo(() => {
    if (!createdRequest) return ''

    const params = new URLSearchParams()
    params.set('req_id', createdRequest.req_id)

    return `${RoutePaths.AcceptInvitationFillRequest}${params.toString()}`
  }, [createdRequest])

  if (isLoading) return <></>

  if (isLoadingError) return <></>

  if (!redirectPath) return <></>

  return <Navigate to={redirectPath} />
}

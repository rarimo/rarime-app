import { useCallback, useMemo } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'

import { buildFillRequestDetailsSearchParams, getInvitationDetails } from '@/api/modules/auth'
import { acceptInvitation, OrgUserRoles } from '@/api/modules/orgs'
import { RoutePaths } from '@/enums'
import { sleep } from '@/helpers'
import { useAuth, useLoading } from '@/hooks'
import { authStore, useIdentityState } from '@/store'

// DUMMY_INVITATION_LINK
// http://localhost:8095/i?q=eyJvcmdfaWQiOiJlZmM3MjhmMC0zMzEwLTQxOWEtODdlZi01ZTVlNDAyOGI4YzAiLCJncm91cF9pZCI6IjU0NGQxNmY0LWQ4YzMtNDYyYy05NjIxLWVjYzg3OTQ5NGQ0MSIsImludml0ZV9lbWFpbF9pZCI6IjVjMmFmZWIwLWRmYjYtNDdiNS1iNmE1LWQ1NmIzOTVkNmU5MyIsIm90cCI6IjEyMzQ1NiJ9

export default function EmailVerification() {
  const [searchParams] = useSearchParams()

  const { userDid } = useIdentityState()
  const { authorize } = useAuth()

  const invitationDetails = useMemo(() => getInvitationDetails(searchParams), [searchParams])

  const authorizeAndGetCreatedRequest = useCallback(async () => {
    if (!invitationDetails) throw new TypeError('Invitation details are not defined')

    await sleep(2_000)

    const createdRequest = await acceptInvitation({
      groupId: invitationDetails.group_id,
      orgId: invitationDetails.org_id,
      userDid: userDid,
      otp: invitationDetails.otp,
    })

    // TODO: add loader, because issuer publishing claim takes time

    const jwtTokens = await authorize({
      claimId: createdRequest.claim_id,
      orgId: invitationDetails.org_id,
      groupId: invitationDetails.group_id,
      role: OrgUserRoles.Undefined,
    })

    authStore.addTokensGroup(jwtTokens, invitationDetails.org_id, invitationDetails.group_id)

    return createdRequest
  }, [authorize, invitationDetails, userDid])

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

    const params = buildFillRequestDetailsSearchParams(
      createdRequest.org_id,
      createdRequest.group_id,
      createdRequest.req_id,
    )

    return `${RoutePaths.AcceptInvitationFillRequest}?${params.toString()}`
  }, [createdRequest])

  if (isLoading) return <></>

  if (isLoadingError) return <></>

  if (!redirectPath) return <></>

  return <Navigate to={redirectPath} />
}

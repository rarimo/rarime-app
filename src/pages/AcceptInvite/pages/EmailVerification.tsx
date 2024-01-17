import { useCallback, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { acceptInvitation } from '@/api'
import { RoutePaths } from '@/enums'
import { useAuth, useMetamaskZkpSnapContext } from '@/hooks'
import { authStore } from '@/store'

export default function EmailVerification() {
  const location = useLocation()
  const navigate = useNavigate()
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

    navigate(`${RoutePaths.AcceptInviteFulfillRequest}${location.search}`)
  }, [
    authorize,
    inviteDetails.group_id,
    inviteDetails.org_id,
    inviteDetails.otp,
    location.search,
    navigate,
    userDid,
  ])

  useEffect(() => {
    if (!inviteDetails) return

    acceptInvite()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteDetails])

  return <></>
}

import { useCallback, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { acceptInvitation } from '@/api'
import { ErrorHandler } from '@/helpers'
import { useMetamaskZkpSnapContext } from '@/hooks'

export default function EmailVerification() {
  console.log('EmailVerification')
  const [searchParams] = useSearchParams()

  const { userDid } = useMetamaskZkpSnapContext()

  const inviteDetails = useMemo<{
    group_id: string
    invite_email_id: string
    org_id: string
    otp: string
  }>(() => {
    try {
      return JSON.parse(atob(searchParams.get('q') || ''))
    } catch (error) {
      return undefined
    }
  }, [searchParams])

  const init = useCallback(async () => {
    try {
      await acceptInvitation({
        groupId: inviteDetails.group_id,
        orgId: inviteDetails.org_id,
        userDid: userDid,
        otp: inviteDetails.otp,
      })
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error)
    }
  }, [inviteDetails.group_id, inviteDetails.org_id, inviteDetails.otp, userDid])

  useEffect(() => {
    if (!inviteDetails || userDid) return

    init()
  }, [init, inviteDetails, userDid])

  return <></>
}

import { useMemo } from 'react'
import { generatePath, Navigate, useParams } from 'react-router-dom'

import { RoutePaths } from '@/enums'

export default function RewardsInvitationAlias() {
  const { code = '' } = useParams<{ code: string }>()

  const redirectPath = useMemo(() => {
    const searchParams = new URLSearchParams()
    searchParams.append('code', code)

    return `${generatePath(RoutePaths.DownloadApp)}?${searchParams.toString()}`
  }, [code])

  return <Navigate to={redirectPath} replace />
}

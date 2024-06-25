import { useParams } from 'react-router-dom'

import DownloadApp from '@/pages/DownloadApp'

export default function RewardsInvitationAlias() {
  const { code = '' } = useParams<{ code: string }>()

  return <DownloadApp extCode={code} />
}

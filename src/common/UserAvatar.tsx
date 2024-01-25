import { Avatar } from '@mui/material'
import jdenticon from 'jdenticon/standalone'
import { useMemo } from 'react'

import { useMetamaskZkpSnapContext } from '@/hooks'

const UserAvatar = ({ ...rest }) => {
  const { userDid } = useMetamaskZkpSnapContext()
  const userAvatar = useMemo(() => {
    return jdenticon.toSvg(userDid, 48)
  }, [userDid])

  return <Avatar {...rest} src={`data:image/svg+xml;utf8,${encodeURIComponent(userAvatar)}`} />
}

export default UserAvatar

import { Avatar, AvatarProps } from '@mui/material'
import jdenticon from 'jdenticon/standalone'
import { useMemo } from 'react'

interface UserAvatarProps extends AvatarProps {
  userDid: string
  size?: number
}

const UserAvatar = ({ userDid, size = 48, ...rest }: UserAvatarProps) => {
  const userAvatar = useMemo(() => {
    return jdenticon.toSvg(userDid, Number(size))
  }, [size, userDid])

  return <Avatar {...rest} src={`data:image/svg+xml;utf8,${encodeURIComponent(userAvatar)}`} />
}

export default UserAvatar

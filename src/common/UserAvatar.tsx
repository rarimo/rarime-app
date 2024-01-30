import { Avatar, AvatarProps, useTheme } from '@mui/material'
import jdenticon from 'jdenticon/standalone'
import { useMemo } from 'react'

interface UserAvatarProps extends AvatarProps {
  userDid: string
  size?: number
}

const UserAvatar = ({ userDid, size = 12, ...rest }: UserAvatarProps) => {
  const { spacing } = useTheme()

  const userAvatar = useMemo(() => {
    return jdenticon.toSvg(userDid, parseInt(spacing(size)))
  }, [size, userDid, spacing])

  return <Avatar {...rest} src={`data:image/svg+xml;utf8,${encodeURIComponent(userAvatar)}`} />
}

export default UserAvatar

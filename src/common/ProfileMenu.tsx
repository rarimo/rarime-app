import { config } from '@config'
import {
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { redirect } from 'react-router-dom'

import { UserAvatar } from '@/common'
import { BusEvents, RoutePaths } from '@/enums'
import { bus } from '@/helpers'
import { useAuth, useMetamaskZkpSnapContext } from '@/hooks'
import { UiIcon } from '@/ui'

interface ProfileMenuProps {
  anchorEl?: null | HTMLElement | undefined
  handleClose: () => void
}

export default function ProfileMenu({ anchorEl, handleClose }: ProfileMenuProps) {
  const [isCopied, setIsCopied] = useState(false)

  const open = Boolean(anchorEl)
  const { palette, spacing, shadows } = useTheme()
  const { userDid } = useMetamaskZkpSnapContext()
  const { logout } = useAuth()

  let timeout: NodeJS.Timeout

  const copyToClipboard = async () => {
    try {
      clearTimeout(timeout)
      await navigator.clipboard.writeText(`${userDid}`)
      setIsCopied(true)
      timeout = setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    } catch (e) {
      bus.emit(BusEvents['error'], 'Not copied, pleas try again')
    }
  }

  const redirectToSupport = () => {
    window.open(config.SUPPORT_LINK, '_blank', 'noopener noreferrer')
  }

  const logOut = async () => {
    await logout()
    redirect(RoutePaths.SignIn)
  }

  const userDidLabel = useMemo(() => {
    const maxLength = 12

    if (userDid.length > maxLength) {
      return userDid.substring(0, 8) + '...' + userDid.substring(userDid.length - 4)
    }
    return userDid
  }, [userDid])

  return (
    <Menu
      anchorEl={anchorEl}
      id='account-menu'
      open={open}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      MenuListProps={{
        sx: {
          width: spacing(60.5),
          border: 1,
          borderColor: palette.action.hover,
          borderRadius: spacing(2),
          boxShadow: shadows[0],
          pt: 0,
        },
      }}
    >
      <Stack direction={'column'} p={spacing(4)} alignItems={'center'}>
        <UserAvatar sx={{ width: spacing(12), height: spacing(12) }} />
        <Tooltip title={'Copied'} open={isCopied} onClose={handleClose}>
          <Typography
            variant={'subtitle4'}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            maxWidth={spacing(30)}
            mt={spacing(3)}
            sx={{ cursor: 'pointer' }}
            onClick={copyToClipboard}
          >
            {userDidLabel}
          </Typography>
        </Tooltip>
      </Stack>
      <Divider sx={{ py: spacing(2) }} />
      <MenuItem onClick={handleClose} sx={{ py: spacing(2.5), px: spacing(4) }}>
        <ListItemIcon>
          <UiIcon componentName={'qrCode'} size={5} sx={{ color: palette.text.secondary }} />
        </ListItemIcon>
        <Typography variant={'caption1'}>QR login</Typography>
      </MenuItem>
      <MenuItem onClick={redirectToSupport} sx={{ py: spacing(2.5), px: spacing(4) }}>
        <ListItemIcon>
          <UiIcon componentName={'openInNew'} size={5} sx={{ color: palette.text.secondary }} />
        </ListItemIcon>
        <Typography variant={'caption1'}>Help Center</Typography>
      </MenuItem>
      <MenuItem onClick={logOut} sx={{ py: spacing(2.5), px: spacing(4) }}>
        <ListItemIcon>
          <UiIcon componentName={'logOut'} size={5} sx={{ color: palette.error.main }} />
        </ListItemIcon>
        <Typography variant={'caption1'} color={palette.error.main}>
          Disconnect
        </Typography>
      </MenuItem>
    </Menu>
  )
}

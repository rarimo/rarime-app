import { config } from '@config'
import { Divider, ListItemIcon, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import copy from 'copy-to-clipboard'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { UserAvatar } from '@/common'
import { BusEvents } from '@/enums'
import { bus } from '@/helpers'
import { useAuth, useMetamaskZkpSnapContext } from '@/hooks'
import { UiIcon, UiIconButton, UiTooltip } from '@/ui'

interface ProfileMenuProps {
  anchorEl?: HTMLElement | null
  handleClose: () => void
}

const MAX_LENGTH_FORMATTED_DID = 12

const MenuItemStyles = { py: 2.5, px: 4 }

export default function ProfileMenu({ anchorEl, handleClose }: ProfileMenuProps) {
  const [isCopied, setIsCopied] = useState(false)
  const { palette, spacing, shadows } = useTheme()
  const { userDid } = useMetamaskZkpSnapContext()
  const { logout } = useAuth()

  const copyToClipboard = async () => {
    try {
      copy(userDid)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (e) {
      bus.emit(BusEvents.error, 'Not copied, pleas try again')
    }
  }

  const logOut = async () => {
    await logout()
  }

  const formatedDidLabel = useMemo(
    () =>
      userDid.length > MAX_LENGTH_FORMATTED_DID
        ? userDid.slice(0, 8) + '...' + userDid.slice(-4)
        : userDid,
    [userDid],
  )

  return (
    <Menu
      anchorEl={anchorEl}
      id='profile-menu'
      open={!!anchorEl}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      MenuListProps={{
        sx: {
          width: spacing(60),
          border: 1,
          borderColor: palette.action.hover,
          borderRadius: 2,
          boxShadow: shadows[0],
          pt: 0,
        },
      }}
    >
      <Stack direction={'column'} p={4} alignItems={'center'}>
        <UserAvatar sx={{ width: spacing(12), height: spacing(12) }} userDid={userDid} />
        <Stack direction={'row'} mt={3}>
          <Typography
            variant={'subtitle4'}
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            maxWidth={spacing(30)}
          >
            {formatedDidLabel}
          </Typography>
          <UiTooltip title={'Copied'} open={isCopied} onClose={handleClose}>
            <UiIconButton onClick={copyToClipboard} sx={{ ml: 2 }}>
              <UiIcon componentName={'contentCopy'} size={4} />
            </UiIconButton>
          </UiTooltip>
        </Stack>
      </Stack>
      <Divider sx={{ py: 2 }} />
      {/*TODO: Add handler*/}
      <MenuItem sx={MenuItemStyles}>
        <ListItemIcon>
          <UiIcon componentName={'qrCode'} size={5} sx={{ color: palette.text.secondary }} />
        </ListItemIcon>
        <Typography variant={'caption1'}>QR login</Typography>
      </MenuItem>
      <MenuItem sx={MenuItemStyles}>
        <Link to={config.SUPPORT_LINK} target='_blank' rel='noreferrer noopener'>
          <ListItemIcon>
            <UiIcon componentName={'openInNew'} size={5} sx={{ color: palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant={'caption1'}>Help Center</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={logOut} sx={MenuItemStyles}>
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

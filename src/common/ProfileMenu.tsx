import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  SxProps,
  Typography,
  useTheme,
} from '@mui/material'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import { zkpSnap } from '@/api/clients'
import { UserAvatar } from '@/common'
import { config } from '@/config'
import { BusEvents, Icons } from '@/enums'
import { bus, ErrorHandler, formatDid } from '@/helpers'
import { useAuth, useCopyToClipboard } from '@/hooks'
import { UiIcon } from '@/ui'

interface ProfileMenuProps {
  userDid: string
}

export default function ProfileMenu({ userDid }: ProfileMenuProps) {
  const { palette, spacing } = useTheme()
  const { logout } = useAuth()
  const { copy, isCopied } = useCopyToClipboard()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  const menuItemSx: SxProps = { py: 2.5, px: 4 }

  const copyUserDid = async () => {
    try {
      await copy(userDid)
    } catch (e) {
      bus.emit(BusEvents.error, {
        message: 'Not copied, please try again',
      })
    }
  }

  const exportIdentity = useCallback(async () => {
    try {
      setIsExporting(true)
      await zkpSnap.exportIdentity()
    } catch (error) {
      ErrorHandler.process(error)
    }
    setIsExporting(false)
  }, [])

  return (
    <>
      <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
        <UserAvatar userDid={userDid} size={8} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='profile-menu'
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        MenuListProps={{ sx: { width: spacing(60) } }}
      >
        <Stack direction='column' p={4} alignItems='center'>
          <UserAvatar userDid={userDid} size={12} />
          <Stack direction='row' mt={3} spacing={2}>
            <Typography
              variant='subtitle4'
              overflow='hidden'
              textOverflow='ellipsis'
              maxWidth={spacing(40)}
            >
              {formatDid(userDid)}
            </Typography>
            <IconButton onClick={copyUserDid} color={isCopied ? 'success' : 'primary'}>
              <UiIcon name={isCopied ? Icons.Check : Icons.CopySimple} size={4} />
            </IconButton>
          </Stack>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        {/*TODO: Add handler*/}
        <MenuItem onClick={exportIdentity} sx={menuItemSx} disabled={isExporting}>
          <ListItemIcon>
            <UiIcon name={Icons.Key} size={5} sx={{ color: palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant='caption1'>
            {isExporting ? 'Exporting...' : 'Export Identity'}
          </Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to={config.SUPPORT_LINK}
          target='_blank'
          rel='noreferrer noopener'
          sx={menuItemSx}
        >
          <ListItemIcon>
            <UiIcon name={Icons.ArrowSquareOut} size={5} sx={{ color: palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant='caption1'>Help Center</Typography>
        </MenuItem>
        <MenuItem onClick={logout} sx={menuItemSx}>
          <ListItemIcon>
            <UiIcon name={Icons.Logout} size={5} sx={{ color: palette.error.main }} />
          </ListItemIcon>
          <Typography variant='caption1' color={palette.error.main}>
            Disconnect
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

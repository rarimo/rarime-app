import {
  Divider,
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
import { BusEvents } from '@/enums'
import { bus, ErrorHandler, formatDid } from '@/helpers'
import { useAuth, useCopyToClipboard } from '@/hooks'
import { UiIcon, UiIconButton } from '@/ui'

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
      bus.emit(BusEvents.error, 'Not copied, please try again')
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
      <UiIconButton onClick={event => setAnchorEl(event.currentTarget)}>
        <UserAvatar userDid={userDid} size={8} />
      </UiIconButton>
      <Menu
        anchorEl={anchorEl}
        id='profile-menu'
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: {
              p: 0,
              border: 0,
              zIndex: 100,
              bgcolor: palette.background.paper,
            },
          },
        }}
        MenuListProps={{
          sx: {
            width: spacing(60),
            border: 1,
            borderColor: palette.action.hover,
            borderRadius: 2,
            pt: 0,
          },
        }}
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
            <UiIconButton onClick={copyUserDid} color={isCopied ? 'success' : 'primary'}>
              <UiIcon componentName={isCopied ? 'check' : 'contentCopy'} size={4} />
            </UiIconButton>
          </Stack>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        {/*TODO: Add handler*/}
        <MenuItem onClick={exportIdentity} sx={menuItemSx} disabled={isExporting}>
          <ListItemIcon>
            <UiIcon componentName='key' size={5} sx={{ color: palette.text.secondary }} />
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
            <UiIcon componentName='openInNew' size={5} sx={{ color: palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant='caption1'>Help Center</Typography>
        </MenuItem>
        <MenuItem onClick={logout} sx={menuItemSx}>
          <ListItemIcon>
            <UiIcon componentName='logOut' size={5} sx={{ color: palette.error.main }} />
          </ListItemIcon>
          <Typography variant='caption1' color={palette.error.main}>
            Disconnect
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

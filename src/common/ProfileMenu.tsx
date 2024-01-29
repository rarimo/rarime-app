import { config } from '@config'
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
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { UserAvatar } from '@/common'
import { BusEvents } from '@/enums'
import { bus, formatDid } from '@/helpers'
import { useAuth, useCopyToClipboard } from '@/hooks'
import { UiIcon, UiIconButton, UiTooltip } from '@/ui'

interface ProfileMenuProps {
  userDid: string
}

export default function ProfileMenu({ userDid }: ProfileMenuProps) {
  const { palette, spacing } = useTheme()
  const { logout } = useAuth()
  const { copy, isCopied } = useCopyToClipboard()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const menuItemSx: SxProps = { py: 2.5, px: 4 }

  const copyUserDid = async () => {
    try {
      await copy(userDid)
    } catch (e) {
      bus.emit(BusEvents.error, 'Not copied, please try again')
    }
  }

  return (
    <>
      <UiIconButton onClick={event => setAnchorEl(event.currentTarget)}>
        <UserAvatar userDid={userDid} />
      </UiIconButton>
      <Menu
        anchorEl={anchorEl}
        id='profile-menu'
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
        <Stack direction={'column'} p={4} alignItems={'center'}>
          <UserAvatar sx={{ width: spacing(12), height: spacing(12) }} userDid={userDid} />
          <Stack direction={'row'} mt={3} spacing={2}>
            <Typography
              variant={'subtitle4'}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
              maxWidth={spacing(30)}
            >
              {formatDid(userDid)}
            </Typography>
            <UiTooltip title={'Copied'} open={isCopied && !!anchorEl}>
              <UiIconButton onClick={copyUserDid}>
                <UiIcon componentName={'contentCopy'} size={4} />
              </UiIconButton>
            </UiTooltip>
          </Stack>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        {/*TODO: Add handler*/}
        <MenuItem sx={menuItemSx}>
          <ListItemIcon>
            <UiIcon componentName={'qrCode'} size={5} sx={{ color: palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant={'caption1'}>QR login</Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to={config.SUPPORT_LINK}
          target='_blank'
          rel='noreferrer noopener'
          sx={menuItemSx}
        >
          <ListItemIcon>
            <UiIcon componentName={'openInNew'} size={5} sx={{ color: palette.text.secondary }} />
          </ListItemIcon>
          <Typography variant={'caption1'}>Help Center</Typography>
        </MenuItem>
        <MenuItem onClick={logout} sx={menuItemSx}>
          <ListItemIcon>
            <UiIcon componentName={'logOut'} size={5} sx={{ color: palette.error.main }} />
          </ListItemIcon>
          <Typography variant={'caption1'} color={palette.error.main}>
            Disconnect
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

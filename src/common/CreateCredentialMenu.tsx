import { Button, Divider, Menu, MenuItem, Stack, Typography, useTheme } from '@mui/material'
import { useId, useState } from 'react'

import { config } from '@/config'
import { Icons } from '@/enums'
import { UiIcon } from '@/ui'

import RarimeAppModal from './RarimeAppModal'

export default function CreateCredentialMenu() {
  const { palette, spacing } = useTheme()

  const buttonId = useId()
  const menuId = useId()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [isAppModalOpen, setIsAppModalOpen] = useState(false)

  const menuItems = [
    {
      icon: Icons.QrCode,
      title: 'Scan credential',
      description: 'STUB: Description text here',
      handler: () => setIsAppModalOpen(true),
    },
    {
      icon: Icons.IdentificationCard,
      title: 'Passport Credential',
      description: 'STUB: Description text here',
      handler: () => setIsAppModalOpen(true),
    },
    {
      icon: Icons.User,
      title: 'Proof of human',
      description: 'STUB: Description text here',
      linkProps: {
        component: 'a',
        href: config.ROBOTORNOT_LINK,
        target: '_blank',
        rel: 'noreferrer',
      },
    },
  ]

  return (
    <>
      <Button
        id={buttonId}
        aria-controls={anchorEl ? menuId : undefined}
        aria-haspopup='true'
        aria-expanded={anchorEl ? 'true' : undefined}
        size='medium'
        endIcon={<UiIcon name={Icons.CarretDown} size={5} />}
        sx={{
          height: spacing(10),
          px: 5,
          '&[aria-expanded="true"]': {
            bgcolor: palette.primary.dark,
          },
        }}
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        Create
      </Button>
      <Menu
        anchorEl={anchorEl}
        id={menuId}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{ paper: { sx: { mt: 4 } } }}
        MenuListProps={{
          sx: { p: 1, width: spacing(80) },
        }}
      >
        {menuItems.map((item, index) => (
          <>
            <MenuItem
              key={index}
              {...item.linkProps}
              sx={{ p: 4, borderRadius: 1 }}
              onClick={item.handler}
            >
              <Stack direction='row' spacing={4}>
                <Stack
                  justifyContent='center'
                  alignItems='center'
                  bgcolor={palette.action.active}
                  color={palette.text.primary}
                  width={spacing(10)}
                  height={spacing(10)}
                  borderRadius={250}
                >
                  <UiIcon name={item.icon} size={5} />
                </Stack>
                <Stack spacing={1}>
                  <Typography variant='buttonMedium'>{item.title}</Typography>
                  <Typography variant='body4' color={palette.text.secondary}>
                    {item.description}
                  </Typography>
                </Stack>
              </Stack>
            </MenuItem>
            {index < menuItems.length - 1 && <Divider />}
          </>
        ))}
      </Menu>

      <RarimeAppModal open={isAppModalOpen} onClose={() => setIsAppModalOpen(false)} />
    </>
  )
}

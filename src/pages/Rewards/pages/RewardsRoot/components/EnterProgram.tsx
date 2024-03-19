import { Box, Button, Divider, Paper, Stack, Typography, useTheme } from '@mui/material'
import { NavLink, useLocation } from 'react-router-dom'

import { Icons, RoutePaths } from '@/enums'
import { UiIcon } from '@/ui'

import InvitationForm from './InvitationForm'

export default function EnterProgram() {
  const location = useLocation()
  const { palette, spacing } = useTheme()

  const socials = [
    {
      name: 'Discord',
      icon: Icons.Discord,
      link: 'https://discord.com/invite/Bzjm5MDXrU',
    },
    {
      name: 'Twitter',
      icon: Icons.TwitterX,
      link: 'https://twitter.com/Rarimo_protocol',
    },
    {
      name: 'Telegram',
      icon: Icons.Telegram,
      link: 'https://t.me/rarimoprotocol',
    },
  ]

  return (
    <Paper component={Stack} spacing={8} position='relative'>
      <Box
        component='img'
        src='/imgs/rewards-bg.png'
        alt='Rewards'
        width='100%'
        position='absolute'
        top={0}
        left={0}
        sx={{ pointerEvents: 'none' }}
      />
      <Stack spacing={5} maxWidth={spacing(120)} width='100%' mx='auto' textAlign='center'>
        <Box
          component='img'
          src='/imgs/gift-box.png'
          alt='Gift box'
          height={spacing(16)}
          width='auto'
          sx={{ objectFit: 'contain' }}
        />
        <Stack spacing={2}>
          <Typography variant='h6'>Enter into rewards program</Typography>
          <Typography variant='body2' color={palette.text.secondary}>
            Claim airdrops & earn RMO
          </Typography>
        </Stack>
        <InvitationForm />
        <Button
          component={NavLink}
          to={RoutePaths.RewardsAbout}
          state={{ from: location.pathname + location.search }}
          variant='text'
          color='secondary'
        >
          Learn more about this program
        </Button>
      </Stack>
      <Divider flexItem />
      <Stack spacing={3}>
        <Typography variant='overline2' color={palette.text.secondary}>
          How can I get this code?
        </Typography>
        <Typography variant='body3'>
          You must be invited by someone or receive a code that we post on our social channels
        </Typography>
      </Stack>
      <Stack direction='row' spacing={4}>
        {socials.map((social, index) => (
          <Button
            key={index}
            component='a'
            href={social.link}
            target='_blank'
            color='secondary'
            size='small'
            startIcon={<UiIcon name={social.icon} size={6} />}
            fullWidth
            sx={{
              height: spacing(14),
              borderRadius: 2,
              gap: 1,
              color: palette.text.secondary,
              '&:hover': {
                color: palette.text.primary,
              },
            }}
          >
            {social.name}
          </Button>
        ))}
      </Stack>
    </Paper>
  )
}

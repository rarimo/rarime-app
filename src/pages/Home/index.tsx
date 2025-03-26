import { Paper, Stack, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

import { Icons } from '@/constants/icons'
import { RoutePaths } from '@/services/router'
import { UiIcon } from '@/ui'

interface CardProps {
  title: string
  description: string
  icon: Icons
  route: RoutePaths
}

export default function Home() {
  const cards: CardProps[] = [
    {
      title: 'Download RariMe App',
      description: 'Download the app and create your identity',
      icon: Icons.Rarime,
      route: RoutePaths.DownloadApp,
    },
    {
      title: 'ZK Passport Demo',
      description: 'Request and verify passport ZK proofs',
      icon: Icons.QrCodeLine,
      route: RoutePaths.ProofRequestsDemo,
    },
  ]

  return (
    <Stack gap={4}>
      {cards.map((card, index) => (
        <HomeCard key={index} {...card} />
      ))}
    </Stack>
  )
}

function HomeCard({ title, description, icon, route }: CardProps) {
  const { palette } = useTheme()

  return (
    <Paper
      component={Link}
      to={route}
      sx={{
        padding: 4,
        '&:hover': {
          boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <Stack direction='row' alignItems='center' gap={4}>
        <UiIcon
          name={icon}
          size={10}
          sx={{
            color: palette.common.black,
            background: palette.additional.gradient,
            borderRadius: '50%',
            padding: 2,
          }}
        />
        <Stack gap={0}>
          <Typography variant='subtitle3'>{title}</Typography>
          <Typography variant='body3' color={palette.text.secondary}>
            {description}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

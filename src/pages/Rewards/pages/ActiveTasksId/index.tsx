import { Box, Divider, Stack, Typography, useTheme } from '@mui/material'
import { parse } from 'marked'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { typography } from '@/theme/typography'
import { UiButton, UiIcon } from '@/ui'

export default function ActiveTasksId() {
  const { palette, spacing } = useTheme()

  const task = {
    id: '1',
    title: 'Initial setup of identity credentials',
    endTime: '24 sep, 2024, 10:00am',
    image: '/branding/og-image.jpg',
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.\n- Simply dummy text of the printing\n- There are many variations of passages\n\nMany desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    url: 'https://rarime.com',
    points: 25,
    completed: true,
  }

  const parsedDescription = useMemo(() => {
    return parse(task.description)
  }, [task.description])

  return (
    <Stack spacing={6}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <UiButton
          component={NavLink}
          to={RoutePaths.Rewards}
          variant='text'
          color='secondary'
          size='small'
          startIcon={<UiIcon componentName={'chevronLeft'} size={5} />}
          sx={{ width: 'fit-content' }}
        >
          Go Back
        </UiButton>

        <UiButton
          variant='text'
          color='secondary'
          size='small'
          startIcon={<UiIcon componentName={'shareOutlined'} size={5} />}
          sx={{ width: 'fit-content' }}
        >
          Share
        </UiButton>
      </Stack>

      <Stack
        p={6}
        spacing={6}
        bgcolor={palette.background.light}
        border={1}
        borderColor={palette.additional.layerBorder}
        borderRadius={4}
      >
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Stack spacing={4}>
            <Typography variant='subtitle2'>{task.title}</Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={4}>
              <Typography
                variant='subtitle4'
                px={2}
                py={1}
                borderRadius={12}
                bgcolor={palette.warning.light}
              >
                🎁 +{task.points}
              </Typography>
              <Typography variant='caption2' color={palette.text.secondary}>
                Exp: {task.endTime}
              </Typography>
            </Stack>
          </Stack>
          <Box
            component='img'
            src={task.image}
            sx={{
              bgcolor: palette.action.active,
              borderRadius: 2,
              objectFit: 'cover',
              width: spacing(21),
              height: spacing(21),
            }}
          />
        </Stack>
        <Divider />
        <Typography
          component={'div'}
          variant='body3'
          dangerouslySetInnerHTML={{ __html: parsedDescription }}
          sx={{
            '& p': {
              paddingTop: 0,
              paddingBottom: spacing(2),
            },
            '& ul': {
              paddingTop: 0,
              paddingLeft: spacing(4),
              paddingBottom: spacing(2),
            },
            '& li': typography.subtitle4,
          }}
        />
        <UiButton component={'a'} href={task.url} target='_blank' sx={{ width: spacing(40) }}>
          {"Let's Start"}
        </UiButton>
      </Stack>
    </Stack>
  )
}

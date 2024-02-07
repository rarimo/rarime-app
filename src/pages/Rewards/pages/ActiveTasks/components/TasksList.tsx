import { ButtonProps, Divider, Stack, Typography, useTheme } from '@mui/material'
import { generatePath, NavLink } from 'react-router-dom'

import { RoutePaths } from '@/enums'
import { UiButton } from '@/ui'

export default function TasksList() {
  const { palette, spacing } = useTheme()

  const tasks = [
    {
      id: '1',
      title: 'Initial setup of identity credentials',
      points: 25,
      completed: true,
    },
    {
      id: '2',
      title: 'Generation of ZKPs',
      points: 10,
      completed: false,
    },
    {
      id: '3',
      title: 'Getting a Poh credential',
      points: 15,
      completed: false,
    },
    {
      id: '4',
      title: 'Invite member in your organization',
      points: 30,
      completed: false,
    },
  ]

  const sharedButtonProps: ButtonProps = {
    size: 'medium',
    sx: { width: spacing(19), height: spacing(8) },
  }

  return (
    <Stack
      p={6}
      spacing={6}
      bgcolor={palette.background.light}
      border={1}
      borderColor={palette.additional.layerBorder}
      borderRadius={4}
    >
      <Typography variant='subtitle3'>Active tasks</Typography>
      <Stack spacing={4}>
        {tasks.map((task, index) => (
          <Stack spacing={4} key={task.id}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography
                component={NavLink}
                to={generatePath(RoutePaths.RewardsActiveId, { id: task.id })}
                variant='subtitle4'
                color={palette.text.primary}
              >
                {task.title}
              </Typography>
              <Stack direction={'row'} alignItems={'center'} spacing={6}>
                <Typography
                  variant='subtitle4'
                  px={2}
                  py={1}
                  borderRadius={12}
                  bgcolor={palette.warning.light}
                >
                  {`🎁 +${task.points}`}
                </Typography>

                {task.completed ? (
                  <UiButton {...sharedButtonProps}>Claim</UiButton>
                ) : (
                  <UiButton
                    component={NavLink}
                    to={generatePath(RoutePaths.RewardsActiveId, { id: task.id })}
                    color='secondary'
                    {...sharedButtonProps}
                  >
                    View
                  </UiButton>
                )}
              </Stack>
            </Stack>
            {index !== tasks.length - 1 && <Divider />}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

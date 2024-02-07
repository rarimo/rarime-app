import { Divider, Stack, Typography, useTheme } from '@mui/material'

export default function History() {
  const { palette } = useTheme()

  const tasks = [
    {
      id: '1',
      title: 'Initial setup of identity credentials',
      points: 25,
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
    },
  ]

  return (
    <Stack
      p={6}
      spacing={6}
      bgcolor={palette.background.light}
      border={1}
      borderColor={palette.additional.layerBorder}
      borderRadius={4}
    >
      <Typography variant='subtitle3'>My History</Typography>
      <Stack spacing={4}>
        {tasks.map((task, index) => (
          <Stack spacing={4} key={task.id}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant='subtitle4' color={palette.text.primary}>
                {task.title}
              </Typography>
              <Stack direction={'row'} alignItems={'center'} spacing={6}>
                <Typography
                  variant='subtitle4'
                  px={2}
                  py={1}
                  borderRadius={12}
                  bgcolor={palette.action.active}
                >
                  {`🎁 +${task.points}`}
                </Typography>
              </Stack>
            </Stack>
            {index !== tasks.length - 1 && <Divider />}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

import { Stack } from '@mui/material'

import LimitedEvents from './components/LimitedEvents'
import PointsBlock from './components/PointsBlock'
import TasksList from './components/TasksList'

export default function ActiveTasks() {
  return (
    <Stack spacing={4}>
      <PointsBlock />
      <LimitedEvents />
      <TasksList />
    </Stack>
  )
}

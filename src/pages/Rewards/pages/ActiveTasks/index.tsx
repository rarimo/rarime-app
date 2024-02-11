import { Stack } from '@mui/material'

import BalanceBlock from './components/BalanceBlock'
import LimitedEvents from './components/LimitedEvents'
import TasksList from './components/TasksList'

export default function ActiveTasks() {
  return (
    <Stack spacing={4}>
      <BalanceBlock />
      <LimitedEvents />
      <TasksList />
    </Stack>
  )
}

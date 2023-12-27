import { Stack } from '@mui/material'

import { useStepper } from '@/hooks'
import { UiStepper } from '@/ui'

import { MetadataForm, VerifyForm } from './components'

export default function OrgNew() {
  const { steps, activeStep, activeComponent } = useStepper(({ next, back }) => [
    { label: 'Details', content: <MetadataForm next={() => next()} /> },
    { label: 'Verify', content: <VerifyForm back={() => back()} /> },
  ])

  return (
    <Stack flex={1}>
      <UiStepper steps={steps} activeStep={activeStep} />

      {activeComponent}
    </Stack>
  )
}

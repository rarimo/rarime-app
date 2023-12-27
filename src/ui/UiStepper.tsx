import { Step, StepLabel, Stepper, StepperProps } from '@mui/material'

interface Props extends StepperProps {
  steps: {
    label: string
  }[]
}

export default function UiStepper({ steps, ...rest }: Props) {
  return (
    <Stepper {...rest} alternativeLabel>
      {steps.map(({ label }) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

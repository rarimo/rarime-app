import { type ReactNode, useCallback, useMemo, useState } from 'react'

interface StepperActions {
  nextStep: () => void
  prevStep: () => void
  setStep: (step: number) => void
  reset: () => void
}

export const useStepper = (
  stepsInitiator: (actions: StepperActions) => {
    label: string
    content: ReactNode
  }[],
  initialStep?: number,
) => {
  const _rawSteps = useMemo(() => stepsInitiator({} as StepperActions), [stepsInitiator])

  const [activeStep, setActiveStep] = useState(initialStep ?? 0)

  const isFirstStep = useMemo(() => {
    return activeStep === 0
  }, [activeStep])

  const isLastStep = useMemo(() => {
    return activeStep === _rawSteps.length - 1
  }, [_rawSteps.length, activeStep])

  const nextStep = useCallback(() => {
    if (isLastStep) return

    setActiveStep(prev => prev + 1)
  }, [isLastStep, setActiveStep])

  const prevStep = useCallback(() => {
    if (isFirstStep) return

    setActiveStep(prev => prev - 1)
  }, [isFirstStep, setActiveStep])

  const setStep = useCallback(
    (step: number) => {
      setActiveStep(step)
    },
    [setActiveStep],
  )

  const reset = useCallback(() => {
    setActiveStep(0)
  }, [setActiveStep])

  const steps = useMemo(() => {
    return stepsInitiator({
      nextStep,
      prevStep,
      setStep,
      reset,
    })
  }, [prevStep, nextStep, reset, setStep, stepsInitiator])

  const activeComponent = useMemo(() => {
    return steps[activeStep].content
  }, [activeStep, steps])

  return {
    steps,

    activeStep,
    activeComponent,
    isFirstStep,
    isLastStep,

    nextStep,
    prevStep,
    setStep,
    reset,
  }
}

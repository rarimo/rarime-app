import { type ReactNode, useCallback, useMemo, useState } from 'react'

interface StepperActions {
  next: () => void
  back: () => void
  set: (step: number) => void
  reset: () => void
}

export const useStepper = (
  stepsInitiator: (actions: StepperActions) => {
    label: string
    content: ReactNode
  }[],
) => {
  const _rawSteps = useMemo(() => stepsInitiator({} as StepperActions), [stepsInitiator])

  const [activeStep, setActiveStep] = useState(0)

  const isFirst = useMemo(() => {
    return activeStep === 0
  }, [activeStep])

  const isLast = useMemo(() => {
    return activeStep === _rawSteps.length - 1
  }, [_rawSteps.length, activeStep])

  const next = useCallback(() => {
    if (isLast) return

    setActiveStep(prev => prev + 1)
  }, [isLast, setActiveStep])

  const back = useCallback(() => {
    if (isFirst) return

    setActiveStep(prev => prev - 1)
  }, [isFirst, setActiveStep])

  const set = useCallback(
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
      next,
      back,
      set,
      reset,
    })
  }, [back, next, reset, set, stepsInitiator])

  const activeComponent = useMemo(() => {
    return steps[activeStep].content
  }, [activeStep, steps])

  return {
    steps,

    activeStep,
    activeComponent,
    isFirst,
    isLast,

    next,
    back,
    set,
    reset,
  }
}

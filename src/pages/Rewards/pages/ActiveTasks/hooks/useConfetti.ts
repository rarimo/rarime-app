import confetti from 'canvas-confetti'
import { useCallback } from 'react'

declare module 'canvas-confetti' {
  interface Options {
    flat?: boolean
  }
}

export function useConfetti() {
  const fireConfetti = useCallback((target: HTMLElement) => {
    const { x, y, width, height } = target.getBoundingClientRect()

    const commonOptions: confetti.Options = {
      spread: 360,
      ticks: 50,
      gravity: 0.4,
      decay: 0.95,
      startVelocity: 8,
      shapes: ['circle', 'star'],
      scalar: 1,
      origin: {
        x: (x + width / 2) / window.innerWidth,
        y: (y + height / 2) / window.innerHeight,
      },
    }

    const firingOptions: confetti.Options[] = [
      { ...commonOptions, particleCount: 20 },
      { ...commonOptions, particleCount: 10, scalar: 0.33 },
      { ...commonOptions, particleCount: 30, scalar: 0.5 },
    ]

    firingOptions.forEach(confetti)
  }, [])

  return { fireConfetti }
}

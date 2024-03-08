import confetti from 'canvas-confetti'
import { useCallback } from 'react'

declare module 'canvas-confetti' {
  interface Options {
    // canvas-confetti does not have a type definition for flat
    flat?: boolean
  }
}

export function useConfetti() {
  const fireConfetti = useCallback((target: HTMLElement) => {
    const { x, y, width, height } = target.getBoundingClientRect()

    const commonOpts: confetti.Options = {
      spread: 360,
      ticks: 50,
      gravity: 0.4,
      decay: 0.95,
      startVelocity: 6,
      shapes: ['circle', 'star'],
      scalar: 0.5,
      origin: {
        x: (x + width / 2) / window.innerWidth,
        y: (y + height / 2) / window.innerHeight,
      },
    }

    confetti({ ...commonOpts, particleCount: 20 })
    confetti({ ...commonOpts, particleCount: 10, scalar: 0.15 })
    confetti({ ...commonOpts, particleCount: 30, scalar: 0.25 })
  }, [])

  return { fireConfetti }
}

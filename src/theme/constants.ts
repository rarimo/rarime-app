import { keyframes } from '@emotion/react'

export const FONT_FAMILY = "'Inter', sans-serif"

export enum FontWeight {
  Light = 300,
  Regular = 400,
  Medium = 500,
  SemiBold = 600,
  Bold = 700,
}

export enum Transitions {
  Default = 'all 0.2s ease-out',
}

export const hiddenScrollbar = {
  /* Hide scrollbar for: */
  msOverflowStyle: 'none' /* IE and Edge */,
  scrollbarWidth: 'none' /* Firefox */,

  /* Chrome, Safari and Opera */
  [`&::-webkit-scrollbar`]: {
    display: 'none',
  },
}

/* Animations */
export const bottomAppearAnimation = keyframes`
  from {
    transform: translateY(80%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

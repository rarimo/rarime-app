import { TypographyOptions } from '@mui/material/styles/createTypography'
import { CSSProperties } from 'react'

export interface ExtendedTypographyOptions extends TypographyOptions {
  subtitle3: CSSProperties
  subtitle4: CSSProperties
  body3: CSSProperties
  body4: CSSProperties
}

declare module '@mui/material/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3: true
    subtitle4: true
    body3: true
    body4: true
  }
}

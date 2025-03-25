import { FONT_FAMILY, FontWeight } from './constants'
import { toRem } from './helpers'
import { ExtendedTypographyOptions } from './types'

export const typography: ExtendedTypographyOptions = {
  htmlFontSize: 16,

  fontFamily: FONT_FAMILY,
  fontSize: 14,

  fontWeightLight: FontWeight.Light,
  fontWeightRegular: FontWeight.Regular,
  fontWeightMedium: FontWeight.Medium,
  fontWeightBold: FontWeight.Bold,

  h1: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(96),
    lineHeight: 1,
  },
  h2: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(64),
    lineHeight: toRem(70),
  },
  h3: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(48),
    lineHeight: toRem(56),
  },
  h4: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(32),
    lineHeight: toRem(40),
  },
  h5: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(24),
    lineHeight: toRem(30),
  },
  h6: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(20),
    lineHeight: toRem(24),
  },
  subtitle1: {
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(24),
    lineHeight: toRem(30),
  },
  subtitle2: {
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(20),
    lineHeight: toRem(24),
  },
  subtitle3: {
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(16),
    lineHeight: toRem(20),
  },
  subtitle4: {
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(14),
    lineHeight: toRem(18),
  },
  subtitle5: {
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(12),
    lineHeight: toRem(16),
  },
  body1: {
    fontWeight: FontWeight.Regular,
    fontSize: toRem(20),
    lineHeight: toRem(24),
    letterSpacing: toRem(0.4),
  },
  body2: {
    fontWeight: FontWeight.Regular,
    fontSize: toRem(16),
    lineHeight: toRem(20),
    letterSpacing: toRem(0.32),
  },
  body3: {
    fontWeight: FontWeight.Regular,
    fontSize: toRem(14),
    lineHeight: toRem(20),
    letterSpacing: toRem(0.28),
  },
  body4: {
    fontWeight: FontWeight.Regular,
    fontSize: toRem(12),
    lineHeight: toRem(16),
    letterSpacing: toRem(0.24),
  },
  button: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(14),
    lineHeight: toRem(18),
    letterSpacing: 0,
    textTransform: 'none',
  },
  buttonLarge: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(16),
    lineHeight: toRem(20),
  },
  buttonMedium: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(14),
    lineHeight: toRem(18),
  },
  buttonSmall: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(12),
    lineHeight: toRem(14),
  },
  caption1: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(14),
    lineHeight: toRem(18),
  },
  caption2: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(12),
    lineHeight: toRem(16),
  },
  caption3: {
    fontWeight: FontWeight.Medium,
    fontSize: toRem(10),
    lineHeight: toRem(12),
  },
  overline1: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(14),
    lineHeight: toRem(18),
    letterSpacing: toRem(0.56),
    textTransform: 'uppercase',
  },
  overline2: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(12),
    lineHeight: toRem(16),
    letterSpacing: toRem(0.48),
    textTransform: 'uppercase',
  },
  overline3: {
    fontWeight: FontWeight.Bold,
    fontSize: toRem(10),
    lineHeight: toRem(12),
    letterSpacing: toRem(0.4),
    textTransform: 'uppercase',
  },
}

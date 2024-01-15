import { FontWeight } from '@/enums'
import { ExtendedTypographyOptions } from '@/types'

import { toRem } from './helpers'

const FONT_FAMILY = "'EuclidCircularB', sans-serif"

export const typography: ExtendedTypographyOptions = {
  htmlFontSize: 16,

  fontFamily: FONT_FAMILY,
  fontSize: 14,

  fontWeightLight: FontWeight.Light,
  fontWeightRegular: FontWeight.Regular,
  fontWeightMedium: FontWeight.Medium,
  fontWeightBold: FontWeight.Bold,

  h1: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(96),
    lineHeight: 1,
    letterSpacing: toRem(-1.5),
  },
  h2: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(60),
    lineHeight: 1,
    letterSpacing: toRem(-0.5),
  },
  h3: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(48),
    lineHeight: 1.33,
    letterSpacing: 0,
  },
  h4: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(34),
    lineHeight: 1.25,
    letterSpacing: toRem(0.25),
  },
  h5: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(24),
    lineHeight: 1.25,
    letterSpacing: 0,
  },
  h6: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(20),
    lineHeight: 1.6,
    letterSpacing: toRem(0.15),
  },
  subtitle1: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(24),
    lineHeight: 1.25,
    letterSpacing: toRem(0.1),
  },
  subtitle2: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(20),
    lineHeight: 1.2,
    letterSpacing: toRem(0.1),
  },
  subtitle3: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(16),
    lineHeight: 1.25,
    letterSpacing: 0,
  },
  subtitle4: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.SemiBold,
    fontSize: toRem(14),
    lineHeight: 1.285,
    letterSpacing: 0,
  },
  body1: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.Regular,
    fontSize: toRem(20),
    lineHeight: 1.3,
    letterSpacing: toRem(0.15),
  },
  body2: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.Regular,
    fontSize: toRem(16),
    lineHeight: 1.25,
    letterSpacing: toRem(0.15),
  },
  body3: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.Regular,
    fontSize: toRem(14),
    lineHeight: toRem(20),
    letterSpacing: toRem(0.28),
  },
  body4: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.Regular,
    fontSize: toRem(12),
    lineHeight: 1.33,
    letterSpacing: toRem(0.24),
  },
  button: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.Medium,
    fontSize: toRem(16),
    lineHeight: 1.25,
    letterSpacing: 0,
    textTransform: 'none',
  },
  caption: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.Regular,
    fontSize: toRem(14),
    lineHeight: 1.28,
    letterSpacing: toRem(0.1),
  },
  overline: {
    fontFamily: FONT_FAMILY,
    fontWeight: FontWeight.Regular,
    fontSize: toRem(14),
    lineHeight: 1.16,
    letterSpacing: toRem(1),
    textTransform: 'uppercase',
  },
}

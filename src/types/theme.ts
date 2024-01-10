import { Theme } from '@mui/material/styles'
import { TypographyOptions } from '@mui/material/styles/createTypography'
import React from 'react'

import { FontWeight } from '@/enums'

import { ColorString } from './base'

export type BaseTheme = Omit<Theme, 'components'>

export interface ExtendedTypographyOptions extends TypographyOptions {
  body3: React.CSSProperties
}

declare module '@mui/material/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true
  }
}

export type Typography = {
  txtFontFamily: string

  txtFontWeightLight: FontWeight.Light
  txtFontWeightRegular: FontWeight.Regular
  txtFontWeightMedium: FontWeight.Medium
  txtFontWeightSemiBold: FontWeight.SemiBold
  txtFontWeightBold: FontWeight.Bold

  txtFontSizeRegular: string
  txtFontSizeH1: string
  txtFontSizeH2: string
  txtFontSizeH3: string
  txtFontSizeH4: string
  txtFontSizeH5: string
  txtFontSizeH6: string
  txtFontSizeSubtitle1: string
  txtFontSizeSubtitle2: string
  txtFontSizeBody1: string
  txtFontSizeBody2: string
  txtFontSizeBody3: string
  txtFontSizeButton: string
  txtFontSizeCaption: string
  txtFontSizeOverline: string

  txtFontLineHeightH1: number
  txtFontLineHeightH2: number
  txtFontLineHeightH3: number
  txtFontLineHeightH4: number
  txtFontLineHeightH5: number
  txtFontLineHeightH6: number
  txtFontLineHeightSubtitle1: number
  txtFontLineHeightSubtitle2: number
  txtFontLineHeightBody1: number
  txtFontLineHeightBody2: number
  txtFontLineHeightBody3: number
  txtFontLineHeightButton: number
  txtFontLineHeightCaption: number
  txtFontLineHeightOverline: number

  txtFontLetterSpacingH1: string | number
  txtFontLetterSpacingH2: string | number
  txtFontLetterSpacingH3: string | number
  txtFontLetterSpacingH4: string | number
  txtFontLetterSpacingH5: string | number
  txtFontLetterSpacingH6: string | number
  txtFontLetterSpacingSubtitle1: string | number
  txtFontLetterSpacingSubtitle2: string | number
  txtFontLetterSpacingBody1: string | number
  txtFontLetterSpacingBody2: string | number
  txtFontLetterSpacingBody3: string | number
  txtFontLetterSpacingButton: string | number
  txtFontLetterSpacingCaption: string | number
  txtFontLetterSpacingOverline: string | number

  txtFontWeightH1: number
  txtFontWeightH2: number
  txtFontWeightH3: number
  txtFontWeightH4: number
  txtFontWeightH5: number
  txtFontWeightH6: number
  txtFontWeightSubtitle1: number
  txtFontWeightSubtitle2: number
  txtFontWeightBody1: number
  txtFontWeightBody2: number
  txtFontWeightBody3: number
  txtFontWeightButton: number
  txtFontWeightCaption: number
  txtFontWeightOverline: number
}

export type PaletteColors = {
  colDark: ColorString
  colLight: ColorString

  colTxtPrimary: ColorString
  colTxtSecondary: ColorString
  colTxtDisabled: ColorString

  colPrimaryLight: ColorString
  colPrimaryMain: ColorString
  colPrimaryDark: ColorString

  colSecondaryLight: ColorString
  colSecondaryMain: ColorString
  colSecondaryDark: ColorString

  colErrorLight: ColorString
  colErrorMain: ColorString
  colErrorDark: ColorString

  colWarningLight: ColorString
  colWarningMain: ColorString
  colWarningDark: ColorString

  colInfoLight: ColorString
  colInfoMain: ColorString
  colInfoDark: ColorString

  colSuccessLight: ColorString
  colSuccessMain: ColorString
  colSuccessDark: ColorString

  colBgDefault: ColorString
  colBgPaper: ColorString
  colBgDivider: ColorString

  colActionActive: ColorString
  colActionHover: ColorString
  colActionSelected: ColorString
  colActionDisabledBg: ColorString
  colActionFocus: ColorString
  colActionDisabled: ColorString
}

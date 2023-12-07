import { PaletteOptions } from '@mui/material/styles'

import { LIGHT_PALETTE } from './variables'

export const lightPalette: PaletteOptions = {
  common: {
    black: LIGHT_PALETTE.colDark,
    white: LIGHT_PALETTE.colLight,
  },
  text: {
    primary: LIGHT_PALETTE.colTxtPrimary,
    secondary: LIGHT_PALETTE.colTxtSecondary,
    disabled: LIGHT_PALETTE.colTxtDisabled,
  },
  primary: {
    light: LIGHT_PALETTE.colPrimaryLight,
    main: LIGHT_PALETTE.colPrimaryMain,
    dark: LIGHT_PALETTE.colPrimaryDark,
    contrastText: LIGHT_PALETTE.colLight,
  },
  secondary: {
    light: LIGHT_PALETTE.colSecondaryLight,
    main: LIGHT_PALETTE.colSecondaryMain,
    dark: LIGHT_PALETTE.colSecondaryDark,
    contrastText: LIGHT_PALETTE.colLight,
  },
  error: {
    light: LIGHT_PALETTE.colErrorLight,
    main: LIGHT_PALETTE.colErrorMain,
    dark: LIGHT_PALETTE.colErrorDark,
    contrastText: LIGHT_PALETTE.colLight,
  },
  warning: {
    light: LIGHT_PALETTE.colWarningLight,
    main: LIGHT_PALETTE.colWarningMain,
    dark: LIGHT_PALETTE.colWarningDark,
    contrastText: LIGHT_PALETTE.colLight,
  },
  info: {
    light: LIGHT_PALETTE.colInfoLight,
    main: LIGHT_PALETTE.colInfoMain,
    dark: LIGHT_PALETTE.colInfoDark,
    contrastText: LIGHT_PALETTE.colLight,
  },
  success: {
    light: LIGHT_PALETTE.colSuccessLight,
    main: LIGHT_PALETTE.colSuccessMain,
    dark: LIGHT_PALETTE.colSuccessDark,
    contrastText: LIGHT_PALETTE.colLight,
  },
  background: {
    default: LIGHT_PALETTE.colBgDefault,
    paper: LIGHT_PALETTE.colBgPaper,
  },
  divider: LIGHT_PALETTE.colBgDivider,
  action: {
    active: LIGHT_PALETTE.colActionActive,
    hover: LIGHT_PALETTE.colActionHover,
    selected: LIGHT_PALETTE.colActionSelected,
    disabled: LIGHT_PALETTE.colActionDisabled,
    disabledBackground: LIGHT_PALETTE.colActionDisabledBg,
    focus: LIGHT_PALETTE.colActionFocus,
  },
}

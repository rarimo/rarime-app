import { alpha } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

export const lightPalette: PaletteOptions = {
  mode: 'light',
  common: {
    black: '#202020', // base/black
    white: '#FFFFFF', // base/white
  },
  primary: {
    darker: '#8BAC32', // primary/primary-darker
    dark: '#ACD53E', // primary/primary-dark
    main: '#CDFD4A', // primary/primary-base
    light: '#E5FEA1', // primary/primary-light
    lighter: '#F5FFDB', // primary/primary-lighter
    contrastText: '#202020',
  },
  secondary: {
    darker: '#0C0C0C', // secondary/secondary-darker
    dark: '#161616', // secondary/secondary-dark
    main: '#202020', // secondary/secondary-base
    light: '#D2D2D2', // secondary/secondary-light
    lighter: '#F4F4F4', // secondary/secondary-lighter
    contrastText: '#FFFFFF',
  },
  success: {
    darker: '#268764', // success/success-darker
    dark: '#2FA77B', // success/success-dark
    main: '#38C793', // success/success-base
    light: '#C7EFE1', // success/success-light
    lighter: '#EBF9F4', // success/green-lighter
    contrastText: '#FFFFFF',
  },
  error: {
    darker: '#98132C', // error/error-darker
    dark: '#BB1837', // error/error-dark
    main: '#DF1C41', // error/error-base
    light: '#F9D2D9', // error/error-light
    lighter: '#FDEFF2', // error/red-lighter
    contrastText: '#FFFFFF',
  },
  warning: {
    darker: '#A4541E', // warning/warning-darker
    dark: '#CA6725', // warning/warning-dark
    main: '#F17B2C', // warning/warning-base
    light: alpha('#F17B2C', 0.1), // warning/warning-light
    lighter: alpha('#F17B2C', 0.05), // warning/warning-lighter
    contrastText: '#FFFFFF',
  },
  text: {
    primary: '#202020', // text & icons/primary
    secondary: alpha('#202020', 0.56), // text & icons/secondary
    placeholder: alpha('#202020', 0.44), // text & icons/placeholder
    disabled: alpha('#202020', 0.28), // text & icons/disabled
  },
  action: {
    active: alpha('#202020', 0.05), // background/component/primary
    hover: alpha('#202020', 0.1), // background/component/hovererd
    focus: alpha('#202020', 0.15), // background/component/pressed
    selected: alpha('#202020', 0.05), // background/component/selected
    disabled: alpha('#202020', 0.05), // background/component/disabled
  },
  background: {
    default: '#EFEFEF', // background/bg/primary
    light: alpha('#FFFFFF', 0.7), // background/bg/opacity
    paper: '#FFFFFF', // background/bg/pure
  },
  divider: alpha('#202020', 0.05),
  additional: {
    layerBorder: '#FFFFFF', // additional/layer-border
    pureBlack: '#262626', // additional/pure-black
    gradient: 'linear-gradient(180deg, #EFEFEF 0%, #EBEFF3 100%)', // background/bg/gradient-light
  },
}

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  common: {
    black: '#202020', // base/black
    white: '#FFFFFF', // base/white
  },
  primary: {
    darker: '#DDFE84', // primary/primary-darker
    dark: '#D5FD67', // primary/primary-dark
    main: '#CDFD4A', // primary/primary-base
    light: alpha('#CDFD4A', 0.1), // primary/primary-light
    lighter: alpha('#CDFD4A', 0.05), // primary/primary-lighter
    contrastText: '#202020',
  },
  secondary: {
    darker: '#676767', // secondary/secondary-darker
    dark: '#444444', // secondary/secondary-dark
    main: '#202020', // secondary/secondary-base
    light: '#1B1B1B', // secondary/secondary-light
    lighter: '#111111', // secondary/secondary-lighter
    contrastText: '#FFFFFF',
  },
  success: {
    darker: '#78D9B6', // success/success-darker
    dark: '#58D0A4', // success/success-dark
    main: '#6CF1C1', // success/success-base
    light: alpha('#38C793', 0.1), // success/success-light
    lighter: alpha('#38C793', 0.05), // success/green-lighter
    contrastText: '#FFFFFF',
  },
  error: {
    darker: '#E9657E', // error/error-darker
    dark: '#E4405F', // error/error-dark
    main: '#F54667',
    light: alpha('#DF1C41', 0.1), // error/error-light
    lighter: alpha('#DF1C41', 0.05), // error/red-lighter
    contrastText: '#FFFFFF',
  },
  warning: {
    darker: '#F5A570', // warning/warning-darker
    dark: '#F3904E', // warning/warning-dark
    main: '#FDA366', // warning/warning-base
    light: alpha('#F17B2C', 0.1), // warning/warning-light
    lighter: alpha('#F17B2C', 0.05), // warning/warning-lighter
    contrastText: '#FFFFFF',
  },
  text: {
    primary: alpha('#FFFFFF', 0.9), // text & icons/primary
    secondary: alpha('#FFFFFF', 0.56), // text & icons/secondary
    placeholder: alpha('#FFFFFF', 0.44), // text & icons/placeholder
    disabled: alpha('#FFFFFF', 0.28), // text & icons/disabled
  },
  action: {
    active: alpha('#FFFFFF', 0.05), // background/component/primary
    hover: alpha('#FFFFFF', 0.1), // background/component/hovererd
    focus: alpha('#FFFFFF', 0.15), // background/component/pressed
    selected: alpha('#FFFFFF', 0.05), // background/component/selected
    disabled: alpha('#FFFFFF', 0.05), // background/component/disabled
  },
  background: {
    default: '#1B1B1B', // background/bg/primary
    light: alpha('#FFFFFF', 0.05), // background/bg/opacity
    paper: '#272727', // background/bg/pure
  },
  divider: alpha('#FFFFFF', 0.05),
  additional: {
    layerBorder: alpha('#FFFFFF', 0.05), // additional/layer-border
    pureBlack: alpha('#FFFFFF', 0.1), // additional/pure-black
    gradient: 'linear-gradient(180deg, #1D1D1D 0%, #1A1A1A 100%)', // background/bg/gradient-dark
  },
}

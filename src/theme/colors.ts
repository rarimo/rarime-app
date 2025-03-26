import { alpha } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles'

export const lightPalette: PaletteOptions = {
  mode: 'light',
  common: {
    black: '#202020', // base/black
    white: '#FFFFFF', // base/white
  },
  primary: {
    darker: '#050505', // primary/primary-darker
    dark: '#111211', // primary/primary-dark
    main: '#141614', // primary/primary-base
    light: alpha('#141614', 0.12), // primary/primary-light
    lighter: alpha('#141614', 0.06), // primary/primary-lighter
    contrastText: '#202020',
  },
  secondary: {
    darker: '#4D7C0F', // secondary/secondary-darker
    dark: '#65A30D', // secondary/secondary-dark
    main: '#84CC16', // secondary/secondary-base
    light: alpha('#84CC16', 0.12), // secondary/secondary-light
    lighter: alpha('#84CC16', 0.06), // secondary/secondary-lighter
    contrastText: '#FFFFFF',
  },
  success: {
    darker: '#15803D', // success/success-darker
    dark: '#16A34A', // success/success-dark
    main: '#38C793', // success/success-base
    light: alpha('#38C793', 0.12), // success/success-light
    lighter: alpha('#38C793', 0.06), // success/green-lighter
    contrastText: '#FFFFFF',
  },
  error: {
    darker: '#B91C1C', // error/error-darker
    dark: '#DC2626', // error/error-dark
    main: '#EF4444', // error/error-base
    light: alpha('#EF4444', 0.12), // error/error-light
    lighter: alpha('#EF4444', 0.06), // error/red-lighter
    contrastText: '#FFFFFF',
  },
  warning: {
    darker: '#C09027', // warning/warning-darker
    dark: '#E1AC3B', // warning/warning-dark
    main: '#F59E0B', // warning/warning-base
    light: alpha('#F59E0B', 0.12), // warning/warning-light
    lighter: alpha('#F59E0B', 0.06), // warning/warning-lighter
    contrastText: '#FFFFFF',
  },
  text: {
    primary: '#141614', // text & icons/primary
    secondary: alpha('#141614', 0.56), // text & icons/secondary
    placeholder: alpha('#141614', 0.44), // text & icons/placeholder
    disabled: alpha('#141614', 0.28), // text & icons/disabled
  },
  action: {
    active: alpha('#141614', 0.05), // background/component/primary
    hover: alpha('#141614', 0.1), // background/component/hovererd
    focus: alpha('#141614', 0.15), // background/component/pressed
    selected: alpha('#141614', 0.05), // background/component/selected
    disabled: alpha('#141614', 0.05), // background/component/disabled
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
    gradient: 'linear-gradient(180deg, #9AFE8A 0%, #8AFECC 100%)', // background/bg/gradient-light
    invertedDark: '#141614', // additional/inverted-dark
    invertedLight: '#FFFFFF', // additional/inverted-light
  },
}

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  common: {
    black: '#202020', // base/black
    white: '#FFFFFF', // base/white
  },
  primary: {
    darker: '#FFFFFF', // primary/primary-darker
    dark: '#FFFFFF', // primary/primary-dark
    main: '#FFFFFF', // primary/primary-base
    light: alpha('#FFFFFF', 0.12), // primary/primary-light
    lighter: alpha('#FFFFFF', 0.06), // primary/primary-lighter
    contrastText: '#202020',
  },
  secondary: {
    darker: '#A8E152', // secondary/secondary-darker
    dark: '#99D838', // secondary/secondary-dark
    main: '#8CCD28', // secondary/secondary-base
    light: alpha('#8CCD28', 0.12), // secondary/secondary-light
    lighter: alpha('#8CCD28', 0.06), // secondary/secondary-lighter
    contrastText: '#FFFFFF',
  },
  success: {
    darker: '#4AD07B', // success/success-darker
    dark: '#3DD073', // success/success-dark
    main: '#37CF6F', // success/success-base
    light: alpha('#37CF6F', 0.12), // success/success-light
    lighter: alpha('#37CF6F', 0.06), // success/green-lighter
    contrastText: '#FFFFFF',
  },
  error: {
    darker: '#EE6565', // error/error-darker
    dark: '#E65454', // error/error-dark
    main: '#DA4343', // error/error-base
    light: alpha('#DA4343', 0.12), // error/error-light
    lighter: alpha('#DA4343', 0.06), // error/error-lighter
    contrastText: '#FFFFFF',
  },
  warning: {
    darker: '#FBB239', // warning/warning-darker
    dark: '#F3A728', // warning/warning-dark
    main: '#ED9E19', // warning/warning-base
    light: alpha('#ED9E19', 0.12), // warning/warning-light
    lighter: alpha('#ED9E19', 0.06), // warning/warning-lighter
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
    default: '#0E0E0E', // background/bg/primary
    light: alpha('#FFFFFF', 0.05), // background/bg/opacity
    paper: '#272727', // background/bg/pure
  },
  divider: alpha('#FFFFFF', 0.05),
  additional: {
    layerBorder: alpha('#FFFFFF', 0.05), // additional/layer-border
    pureBlack: alpha('#FFFFFF', 0.1), // additional/pure-black
    gradient: 'linear-gradient(180deg, #9AFE8A 0%, #8AFECC 100%)', // background/bg/gradient-light
    invertedDark: '#F3F6F2', // additional/inverted-dark
    invertedLight: '#141614', // additional
  },
}

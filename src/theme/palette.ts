import { PaletteOptions } from '@mui/material/styles'

export const palette: PaletteOptions = {
  mode: 'light',
  // DesignSystem: base
  common: {
    black: '#202020',
    white: '#FFFFFF',
  },
  primary: {
    darker: '#8BAC32',
    dark: '#ACD53E',
    main: '#CDFD4A',
    light: '#E5FEA1',
    lighter: '#F5FFDB',
    contrastText: '#202020',
  },
  secondary: {
    darker: '#0C0C0C',
    dark: '#161616',
    main: '#202020',
    light: '#D2D2D2',
    lighter: '#F4F4F4',
    contrastText: '#FFFFFF',
  },
  success: {
    darker: '#268764',
    dark: '#2FA77B',
    main: '#38C793',
    light: '#C7EFE1',
    lighter: '#EBF9F4',
    contrastText: '#FFFFFF',
  },
  error: {
    darker: '#98132C',
    dark: '#BB1837',
    main: '#DF1C41',
    light: '#F9D2D9',
    lighter: '#FDEFF2',
    contrastText: '#FFFFFF',
  },
  warning: {
    darker: '#A4541E',
    dark: '#CA6725',
    main: '#F17B2C',
    light: '#FCE5D5',
    lighter: '#FEF6F0',
    contrastText: '#FFFFFF',
  },
  // DesignSystem: text & icons
  text: {
    primary: '#202020',
    secondary: 'rgba(32, 32, 32, 0.56)',
    placeholder: 'rgba(32, 32, 32, 0.44)',
    disabled: 'rgba(32, 32, 32, 0.28)',
  },
  // DesignSystem: background/bg
  background: {
    // DesignSystem: background/bg/primary
    default: '#EFEFEF',
    // DesignSystem: background/bg/opacity
    light: 'rgba(255, 255, 255, 0.70)',
    // DesignSystem: background/pure
    paper: '#FFFFFF',
  },
  // DesignSystem: background/component
  action: {
    // DesignSystem: background/component/primary
    active: 'rgba(32, 32, 32, 0.05)',
    hover: 'rgba(32, 32, 32, 0.10)',
    focus: 'rgba(32, 32, 32, 0.15)',
    selected: 'rgba(32, 32, 32, 0.05)',
    disabled: 'rgba(32, 32, 32, 0.05)',
  },
  divider: 'rgba(32, 32, 32, 0.05)',
  additional: {
    layerBorder: '#FFFFFF',
    pureDark: '#262626',
    gradient: 'linear-gradient(180deg, #EFEFEF 0%, #EBEFF3 100%)',
  },
}

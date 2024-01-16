import { PaletteOptions } from '@mui/material/styles'

export const palette: PaletteOptions = {
  mode: 'light',
  common: {
    black: '#1f2124',
    white: '#ffffff',
  },
  text: {
    primary: '#1f2124',
    secondary: '#636a74',
    disabled: '#636a74',
  },
  primary: {
    light: '#3044fe',
    main: '#3044fe',
    dark: '#2839d5',
    contrastText: '#ffffff',
  },
  secondary: {
    light: '#a37cd3',
    main: '#9163cb',
    dark: '#7a53ab',
    contrastText: '#ffffff',
  },
  error: {
    light: '#ff5a51',
    main: '#ff3b30',
    dark: '#d63228',
    contrastText: '#ffffff',
  },
  warning: {
    light: '#ffa629',
    main: '#ff9500',
    dark: '#d67d00',
    contrastText: '#ffffff',
  },
  info: {
    light: '#03a9f4',
    main: '#0288d1',
    dark: '#01579b',
    contrastText: '#ffffff',
  },
  success: {
    light: '#54d074',
    main: '#34c759',
    dark: '#2ca74b',
    contrastText: '#ffffff',
  },
  background: {
    default: '#e0e1f8',
    paper: '#ffffff',
  },
  divider: '#f1f2f4',
  action: {
    active: '#f1f2f4',
    hover: 'rgba(31, 33, 36, 0.04)',
    selected: 'rgba(31, 33, 36, 0.08)',
    disabled: 'rgba(31, 33, 36, 0.12)',
    disabledBackground: 'rgba(31, 33, 36, 0.12)',
    focus: '#636a74',
  },
}

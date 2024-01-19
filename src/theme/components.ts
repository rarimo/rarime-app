import { Components, Theme } from '@mui/material'

import { ICON_COMPONENTS } from '@/enums'

import { Transitions } from './constants'
import { vh } from './helpers'
import { typography } from './typography'

export const components: Components<Omit<Theme, 'components'>> = {
  MuiCssBaseline: {
    styleOverrides: `
      html {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        min-height: ${vh(100)};
        -webkit-overflow-scrolling: touch !important;
        -webkit-tap-highlight-color: transparent;
      }

      body, #root, .App {
        display: flex;
        flex: 1;
        flex-direction: column;
      }
      
      a {
        outline: none;
        text-decoration: none;
      
        &:hover,
        &:focus,
        &:active {
          text-decoration: none;
        }
      }
    `,
  },
  MuiSnackbar: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& > .MuiPaper-root': {
          borderRadius: theme.spacing(1),
        },
      }),
    },
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      size: 'large',
      disableElevation: true,
      disableFocusRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(250),
        transition: Transitions.Default,
        '&.MuiButton-sizeLarge': {
          ...typography.buttonLarge,
          px: theme.spacing(4),
          height: theme.spacing(12),
        },
        '&.MuiButton-sizeMedium': {
          ...typography.buttonMedium,
          px: theme.spacing(4),
          height: theme.spacing(8),
        },
        '&.MuiButton-sizeSmall': {
          ...typography.buttonSmall,
          px: theme.spacing(2),
          height: theme.spacing(6),
        },
      }),
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
      disableTouchRipple: true,
    },
  },
  MuiFormControl: {
    defaultProps: {
      fullWidth: true,
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'unset',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiInputBase-root, & .MuiInputBase-sizeSmall, & .MuiInputBase-sizeMedium':
          typography.body3,
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: {
        width: 20,
        height: 20,
        pointerEvents: 'none',
        top: 18,
      },
    },
    defaultProps: {
      IconComponent: ICON_COMPONENTS.keyboardArrowDownOutlined,
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 0,
        color: theme.palette.text.primary,
        transition: Transitions.Default,

        '&[disabled]': {
          color: theme.palette.text.disabled,
        },

        '&:not([disabled]):hover': {
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
        },

        '&:not([disabled]).active, &:not([disabled]):active': {
          color: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiSkeleton: {
    defaultProps: {
      animation: 'wave',
    },
  },
}

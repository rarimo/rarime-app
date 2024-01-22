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
  MuiStack: {
    defaultProps: {
      useFlexGap: true,
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
      root: ({ theme }) => ({
        '& .MuiInputBase-root, & .MuiInputBase-sizeSmall, & .MuiInputBase-sizeMedium':
          typography.body3,
        '& .MuiInputBase-root': {
          height: theme.spacing(12),
          '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.action.focus,
            borderWidth: 1,
          },
          '&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.action.hover,
          },
        },
        '& .MuiInputBase-sizeSmall': {
          height: theme.spacing(8),
        },
        '& .MuiOutlinedInput-notchedOutline': {
          transition: Transitions.Default,
          borderRadius: theme.spacing(2),
          borderColor: theme.palette.action.active,
        },
      }),
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        ...typography.subtitle4,
        color: 'inherit',
        '&.Mui-focused': {
          color: 'inherit',
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...typography.body4,
        marginTop: theme.spacing(1),
        marginLeft: 0,
      }),
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: ({ theme }) => ({
        width: theme.spacing(5),
        height: theme.spacing(5),
        color: 'inherit',
        pointerEvents: 'none',
        top: theme.spacing(3.5),
        right: theme.spacing(3),
      }),
      root: ({ theme }) => ({
        ...typography.body3,
        height: theme.spacing(12),
        borderRadius: theme.spacing(2),
        '& .MuiOutlinedInput-notchedOutline': {
          transition: Transitions.Default,
          borderColor: theme.palette.action.active,
        },
        '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.action.focus,
          borderWidth: 1,
        },
        '&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.action.hover,
        },
      }),
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
  MuiSwitch: {
    styleOverrides: {
      root: ({ theme }) => ({
        width: theme.spacing(10),
        height: theme.spacing(6),
        padding: 0,
        boxShadow: 'none',
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: theme.spacing(0.5),
          transition: Transitions.Default,
          color: theme.palette.common.white,
          '&.Mui-checked': {
            color: theme.palette.common.white,
            transform: `translateX(${theme.spacing(4)})`,
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.success.main,
              boxShadow: 'none',
              opacity: 1,
              border: 0,
            },
            '& + .MuiSwitch-thumb': {
              boxShadow: 'none',
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.08)',
          width: theme.spacing(5),
          height: theme.spacing(5),
        },
        '& .MuiSwitch-track': {
          borderRadius: theme.spacing(10),
          backgroundColor: theme.palette.action.active,
          opacity: 1,
          transition: Transitions.Default,
        },
      }),
    },
  },
  MuiFormControlLabel: {
    defaultProps: {
      componentsProps: {
        typography: {
          variant: 'subtitle4',
        },
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      variant: 'body3',
    },
  },
}

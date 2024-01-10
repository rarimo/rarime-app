import { Components } from '@mui/material'

import { ICON_COMPONENTS } from '@/enums'
import { BaseTheme } from '@/types'

export const componentsTheme: Components<BaseTheme> = {
  MuiSnackbar: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& > .MuiPaper-root': {
          borderRadius: theme.spacing(1),
          border: 'var(--ui-border)',
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
        transition: 'color 0.2s',

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

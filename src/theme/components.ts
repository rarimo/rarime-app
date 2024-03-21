import { AlertColor, alpha, Components, Theme } from '@mui/material'

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
      }),
      containedSizeLarge: ({ theme }) => ({
        ...typography.buttonLarge,
        padding: theme.spacing(0, 4),
        height: theme.spacing(12),
      }),
      containedSizeMedium: ({ theme }) => ({
        ...typography.buttonMedium,
        padding: theme.spacing(0, 4),
        height: theme.spacing(8),
      }),
      containedSizeSmall: ({ theme }) => ({
        ...typography.buttonSmall,
        padding: theme.spacing(0, 2),
        height: theme.spacing(6),
      }),
      fullWidth: {
        width: '100%',
      },
      text: {
        padding: 0,
        minWidth: 'unset',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      textPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
      }),
      textSecondary: ({ theme }) => ({
        color: theme.palette.text.secondary,
        '&:hover': {
          color: theme.palette.text.primary,
        },
      }),
      textError: ({ theme }) => ({
        color: theme.palette.error.main,
        '&:hover': {
          color: theme.palette.error.dark,
        },
        '&.Mui-disabled, &.Mui-disabled:hover': {
          color: theme.palette.error.main,
          opacity: 0.5,
        },
      }),
      containedPrimary: ({ theme }) => ({
        '&.Mui-disabled': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
          opacity: 0.5,
        },
      }),
      containedSecondary: ({ theme }) => ({
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.active,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
      }),
      containedWarning: ({ theme }) => ({
        color: theme.palette.warning.darker,
        backgroundColor: theme.palette.warning.lighter,
        '&:hover': {
          backgroundColor: theme.palette.warning.light,
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
    defaultProps: {
      variant: 'outlined',
      square: false,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: 'unset',
        background: theme.palette.background.light,
        padding: theme.spacing(6),
        borderColor: theme.palette.additional.layerBorder,
        borderRadius: theme.spacing(4),
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiInputBase-root, & .MuiInputBase-sizeSmall, & .MuiInputBase-sizeMedium':
          typography.body3,
        '& .MuiInputBase-root': {
          minHeight: theme.spacing(12),
          '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.action.focus,
            borderWidth: 1,
          },
          '&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.action.hover,
          },
        },
        '& .MuiInputBase-sizeSmall': {
          height: theme.spacing(10),
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
  },
  MuiIconButton: {
    defaultProps: {
      color: 'primary',
    },
    styleOverrides: {
      root: {
        padding: 0,
        borderRadius: '1000px',
        transition: Transitions.Default,
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      colorPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
      }),
      colorSecondary: ({ theme }) => ({
        color: theme.palette.text.secondary,
        '&:hover': {
          color: theme.palette.text.primary,
        },
      }),
      colorSuccess: ({ theme }) => ({
        color: theme.palette.success.main,
        '&:hover': {
          color: theme.palette.success.dark,
        },
      }),
      colorError: ({ theme }) => ({
        color: theme.palette.error.main,
        '&:hover': {
          color: theme.palette.error.dark,
        },
      }),
      colorWarning: ({ theme }) => ({
        color: theme.palette.warning.main,
        '&:hover': {
          color: theme.palette.warning.dark,
        },
      }),
    },
  },
  MuiSkeleton: {
    defaultProps: {
      animation: 'wave',
      variant: 'rectangular',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.divider,
        borderRadius: theme.spacing(4),
      }),
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
  MuiTooltip: {
    defaultProps: {
      placement: 'bottom',
      enterDelay: 0,
      enterTouchDelay: 0,
    },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        ...typography.body4,
        backgroundColor: theme.palette.additional.pureBlack,
        color: theme.palette.common.white,
        borderRadius: theme.spacing(2),
        padding: theme.spacing(4),
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: theme.spacing(2),
        boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.04)',
        padding: 0,
        zIndex: 100,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:hover': {
          backgroundColor: theme.palette.action.active,
        },
      }),
    },
  },
  MuiPagination: {
    defaultProps: {
      color: 'primary',
      hidePrevButton: true,
      hideNextButton: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiButtonBase-root': {
          ...typography.subtitle4,
          color: theme.palette.text.secondary,
        },
      }),
    },
  },
  MuiDrawer: {
    defaultProps: {
      anchor: 'right',
    },
    styleOverrides: {
      root: {
        '& > .MuiBackdrop-root': {
          backgroundColor: 'rgba(32, 32, 32, 0.50)',
        },
      },
      paper: ({ theme }) => ({
        width: '100%',
        maxWidth: theme.spacing(108),
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none',
        border: 'none',
        borderRadius: theme.spacing(3),
      }),
      paperAnchorRight: ({ theme }) => ({
        height: 'unset',
        top: theme.spacing(3),
        bottom: theme.spacing(3),
        left: 'unset',
        right: theme.spacing(3),
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        width: '100%',
        borderRadius: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        color: alpha(theme.palette.text.primary, 0.7),
        boxShadow: '0px 8px 16px 0px rgba(0, 0, 0, 0.04)',
      }),
      icon: ({ ownerState, theme }) => {
        const severityToBgColor: Record<AlertColor, string> = {
          success: alpha(theme.palette.success.main, 0.2),
          warning: alpha(theme.palette.warning.main, 0.2),
          error: alpha(theme.palette.error.main, 0.2),
          info: alpha(theme.palette.info.main, 0.2),
        }

        return {
          backgroundColor: severityToBgColor[ownerState.severity ?? 'info'],
          marginRight: theme.spacing(4),
          marginTop: 'auto',
          marginBottom: 'auto',
          padding: theme.spacing(2),
          borderRadius: theme.spacing(25),
        }
      },
      message: ({ theme }) => ({
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      }),
    },
  },
  MuiAlertTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        ...typography.subtitle4,
        color: theme.palette.text.primary,
      }),
    },
  },
  MuiLinearProgress: {
    defaultProps: {
      variant: 'determinate',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 250,
        height: theme.spacing(2),
        backgroundColor: theme.palette.action.active,
      }),
      barColorPrimary: ({ theme }) => ({
        borderRadius: 250,
        backgroundColor: theme.palette.primary.dark,
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: ({ theme }) => ({
        padding: 0,
        borderRadius: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px ${theme.palette.action.active}`,
        border: 0,
      }),
    },
  },
  MuiChartsTooltip: {
    styleOverrides: {
      root: () => ({
        '& .MuiChartsTooltip-root': {
          backgroundColor: 'transparent',
          border: 'none',
        },
      }),
      table: ({ theme }) => ({
        backgroundColor: theme.palette.additional.pureBlack,
        padding: theme.spacing(2, 6),
        borderRadius: theme.spacing(250),
      }),
      cell: ({ theme }) => ({
        '&.MuiChartsTooltip-labelCell, &.MuiChartsTooltip-markCell': {
          display: 'none',
        },
        '&.MuiChartsTooltip-valueCell': {
          padding: '0 !important',
          display: 'flex',
          color: theme.palette.common.white,
          '& .MuiTypography-root': typography.buttonSmall,
        },
      }),
    },
  },
}

import { InputAdornment, useTheme } from '@mui/material'
import { ComponentProps, forwardRef } from 'react'

import { Transitions } from '@/theme/constants'

import UiIcon from './UiIcon'
import UiTextField from './UiTextField'

const UiSearchField = forwardRef((props: ComponentProps<typeof UiTextField>, ref) => {
  const { palette, spacing } = useTheme()

  return (
    <UiTextField
      {...props}
      ref={ref}
      autoComplete='off'
      sx={{
        ...props.sx,
        height: props.size === 'small' ? spacing(8) : spacing(10),
      }}
      InputProps={{
        ...props.InputProps,
        startAdornment: (
          <InputAdornment position='start' sx={{ color: palette.text.placeholder }}>
            <UiIcon componentName='search' size={5} />
          </InputAdornment>
        ),
        sx: {
          ...props.InputProps?.sx,
          backgroundColor: palette.action.active,
          borderRadius: 250,
          transition: Transitions.Default,
          px: 4,
          '&:hover': {
            backgroundColor: palette.action.hover,
          },
          '& > .MuiInputBase-input': {
            py: 2.5,
          },
          '&.MuiInputBase-sizeSmall': {
            px: 2,
            '& > .MuiInputBase-input': {
              py: 1.5,
            },
          },
          '& > fieldset': {
            border: '0 !important',
          },
        },
      }}
    />
  )
})

export default UiSearchField

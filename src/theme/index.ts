import { createTheme } from '@mui/material'

import { breakpoints } from './breakpoints'
import { components } from './components'
import { palette } from './palette'
import { typography } from './typography'

export const theme = createTheme({
  palette,
  typography,
  components,
  breakpoints,
  spacing: 4,
  shape: {
    borderRadius: 4,
  },
})

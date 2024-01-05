import { FormControlLabel, Switch, type SwitchProps } from '@mui/material'
import { forwardRef, useMemo } from 'react'

interface Props extends SwitchProps {
  label?: string
  variant?: 'outlined' | 'default'
}

const UiSwitch = forwardRef(({ label, variant = 'default', ...rest }: Props, ref) => {
  const getVariant = useMemo(() => {
    switch (variant) {
      case 'outlined':
        return {
          border: '1px solid',
          borderColor: theme => theme.palette.grey.A200,
          borderRadius: '100px',
          pr: 4,
        }
      default:
        return {}
    }
  }, [variant])

  return label ? (
    <FormControlLabel inputRef={ref} control={<Switch {...rest} />} label={label} sx={getVariant} />
  ) : (
    <Switch {...rest} inputRef={ref} />
  )
})

export default UiSwitch

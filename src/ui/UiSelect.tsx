import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material'
import { ComponentProps, ReactNode, useId, useMemo } from 'react'

import { Icons } from '@/constants/icons'

import UiIcon from './UiIcon'

type Props = Omit<ComponentProps<typeof Select<string>>, 'error'> & {
  options: {
    value: string
    label: string
    adornmentLeft?: ReactNode
    adornmentRight?: ReactNode
  }[]
  errorMessage?: string
  updateValue?: (value: string) => void
}

export default function UiSelect({
  options,
  label,
  updateValue,
  errorMessage,
  ref,
  ...rest
}: Props) {
  const id = useId()
  const labelId = useMemo(() => rest.labelId ?? `${id}-label`, [id, rest.labelId])

  const handleChange = (e: SelectChangeEvent<string>, child: ReactNode) => {
    updateValue?.(e.target.value as string)

    rest?.onChange?.(e, child)
  }

  return (
    <FormControl fullWidth error={!!errorMessage}>
      {label && (
        <FormLabel id={labelId} sx={{ mb: 2 }}>
          {label}
        </FormLabel>
      )}

      <Select
        {...rest}
        inputRef={ref}
        id={id}
        labelId={labelId}
        value={rest.value || ''}
        IconComponent={() => <UiIcon name={Icons.CarretDown} size={4} sx={{ mr: 4 }} />}
        onChange={handleChange}
      >
        {options.map(({ value, label, adornmentLeft, adornmentRight }, idx) => (
          <MenuItem key={idx} value={value}>
            <Stack
              direction='row'
              spacing={1}
              flex={1}
              alignItems='center'
              justifyContent='flex-start'
            >
              {adornmentLeft}
              {label}
              {adornmentRight}
            </Stack>
          </MenuItem>
        ))}
      </Select>

      {errorMessage && <FormHelperText>Error</FormHelperText>}
    </FormControl>
  )
}

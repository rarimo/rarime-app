import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  Stack,
} from '@mui/material'
import { ReactNode, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

type Props<T extends string> = Omit<SelectProps<T>, 'error'> & {
  options: {
    value: T
    label: string
    adornmentLeft?: ReactNode
    adornmentRight?: ReactNode
  }[]
  updateValue?: (value: T) => void
  errorMessage?: string
}

export default function UiSelect<T extends string>({
  options,
  updateValue,
  errorMessage,
  ...rest
}: Props<T>) {
  const id = useMemo(() => rest.id ?? `ui-select-field-${uuidv4()}`, [rest.id])

  const labelId = useMemo(() => rest.labelId ?? `${id}-label`, [id, rest.labelId])

  const handleChange = (e: SelectChangeEvent<T>, child: ReactNode) => {
    updateValue?.(e.target.value as T)

    rest?.onChange?.(e, child)
  }

  return (
    <FormControl fullWidth error={!!errorMessage}>
      {rest.label && <InputLabel id={labelId}>{rest.label}</InputLabel>}

      <Select {...rest} id={id} labelId={labelId} value={rest.value || ''} onChange={handleChange}>
        {options.map(({ value, label, adornmentLeft, adornmentRight }, idx) => (
          <MenuItem key={idx} value={value}>
            <Stack
              flex={1}
              direction='row'
              alignItems='center'
              justifyContent='flex-start'
              gap={theme => theme.spacing(1)}
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

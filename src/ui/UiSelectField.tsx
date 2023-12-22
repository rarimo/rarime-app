import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material'
import { ReactNode, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props<T extends string | number> extends SelectProps<T> {
  selectOptions: {
    value: T
    label: string
  }[]
  updateValue?: (value: string | number) => void
}

export default function UiSelectField<T extends string | number>({
  selectOptions,
  updateValue,
  ...rest
}: Props<T>) {
  const id = useMemo(() => rest.id ?? `ui-select-field-${uuidv4()}`, [rest.id])

  const labelId = useMemo(() => rest.labelId ?? `${id}-label`, [id, rest.labelId])

  const handleChange = (e: SelectChangeEvent<T>, child: ReactNode) => {
    updateValue?.(e.target.value)

    rest?.onChange?.(e, child)
  }

  return (
    <FormControl fullWidth>
      {rest.label && <InputLabel id={labelId}>{rest.label}</InputLabel>}

      <Select {...rest} id={id} labelId={labelId} value={rest.value || ''} onChange={handleChange}>
        {selectOptions.map(({ value, label }, idx) => (
          <MenuItem key={idx} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

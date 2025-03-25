import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material'
import { ChangeEvent, useId } from 'react'

interface Props extends RadioGroupProps {
  groupLabel?: string
  groupOptions: Omit<FormControlLabelProps, 'control'>[]
  updateValue: (value: string) => void
}

export default function UiRadioGroup({
  groupLabel,
  groupOptions,
  updateValue,
  ref,
  ...rest
}: Props) {
  const id = useId()

  const handleChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    updateValue?.(e.target.value)
    rest?.onChange?.(e, value)
  }

  return (
    <FormControl>
      {groupLabel && <FormLabel id={id}>{groupLabel}</FormLabel>}

      <RadioGroup {...rest} aria-labelledby={id} onChange={handleChange}>
        {groupOptions.map(({ value, label, ...elRest }, idx) => (
          <FormControlLabel
            {...elRest}
            inputRef={ref}
            key={idx}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

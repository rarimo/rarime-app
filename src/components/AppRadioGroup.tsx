import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  SelectChangeEvent,
} from '@mui/material'
import { Value } from 'sass'

interface Props {
  labelGroup?: string
  values: Value[]
  labels: string[]
  defaultValue: Value
  name: string
  id: string
  resultValue: (value: SelectChangeEvent<Value>) => void
}

const AppRadioGroup = ({
  labelGroup,
  values,
  labels,
  defaultValue,
  name,
  id,
  resultValue,
}: Props) => {
  const handleChange = (value: SelectChangeEvent<Value>) => {
    resultValue(value)
  }

  return (
    <FormControl>
      {labelGroup && <FormLabel id={id}>{labelGroup}</FormLabel>}
      <RadioGroup defaultValue={defaultValue} onChange={value => handleChange(value)} name={name}>
        {values.map((value, idx) => (
          <FormControlLabel
            key={idx}
            value={value}
            control={<Radio />}
            label={labels[idx] ? labels[idx] : String(value)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

export default AppRadioGroup

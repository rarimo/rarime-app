import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Value } from 'sass'

interface Props {
  labelGroup?: string
  values: string[] | number[]
  labels: string[]
  defaultValue?: string | number
  labelId: string
  id: string
  resultValue: (event: SelectChangeEvent<Value>) => void
}
const AppSelect = ({ labelGroup, values, labels, labelId, id, resultValue }: Props) => {
  const handleChange = (event: SelectChangeEvent<Value>) => {
    resultValue(event)
  }
  return (
    <FormControl fullWidth>
      {labelGroup && <InputLabel id={labelId}>{labelGroup}</InputLabel>}
      <Select
        labelId={labelId}
        id={id}
        label={labels}
        onChange={(event: SelectChangeEvent<Value>) => handleChange(event)}
      >
        {values.map((value, idx) => (
          <MenuItem key={idx} value={value}>
            {labels[idx]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default AppSelect

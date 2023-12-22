import { Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { UiSelectField, UiTextField } from '@/ui'

const SELECT_OPTIONS = [
  {
    label: 'label-1',
    value: 'value-1',
  },
  {
    label: 'label-2',
    value: 'value-2',
  },
  {
    label: 'label-3',
    value: 'value-3',
  },
]

export default function UiKitFields() {
  const [selectedValue, setSelectedValue] = useState<string | number>()

  return (
    <Stack gap={theme => theme.spacing(2)} justifyContent={`flex-start`}>
      <Typography variant={`h6`}>{`Input`}</Typography>
      <Stack
        direction={'row'}
        flexWrap={`wrap`}
        gap={theme => theme.spacing(2)}
        justifyContent={`flex-start`}
      >
        <UiTextField />
        <UiTextField label={'label'} />
        <UiTextField placeholder={'placeholder'} />
        <UiTextField label={'label'} placeholder={'placeholder'} />
        <UiTextField label={'disabled'} disabled={true} />
        <UiTextField label={'label'} />
        <UiTextField label={'error'} error helperText={`there is error`} />
      </Stack>

      <Typography variant={`h6`}>{`Select`}</Typography>
      <Typography>{`Selected value: ${selectedValue}`}</Typography>
      <Stack
        direction={'row'}
        flexWrap={`wrap`}
        gap={theme => theme.spacing(2)}
        justifyContent={`flex-start`}
      >
        <UiSelectField
          selectOptions={SELECT_OPTIONS}
          value={selectedValue}
          updateValue={setSelectedValue}
        />
        <UiSelectField
          label={'label'}
          selectOptions={SELECT_OPTIONS}
          value={selectedValue}
          updateValue={setSelectedValue}
        />
      </Stack>
    </Stack>
  )
}

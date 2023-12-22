import { AccountCircle, Delete } from '@mui/icons-material'
import { InputAdornment, Stack, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import { useState } from 'react'

import { UiCheckbox, UiRadioGroup, UiSelectField, UiTextField } from '@/ui'

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
const RADIO_GROUP_OPTIONS = [
  ...SELECT_OPTIONS,
  {
    label: 'top-4',
    value: 'top-4',
    labelPlacement: 'top' as 'top' | 'bottom' | 'end' | 'start' | undefined,
  },
  {
    label: 'bottom-4',
    value: 'bottom-4',
    labelPlacement: 'bottom' as 'top' | 'bottom' | 'end' | 'start' | undefined,
  },
  {
    label: 'start-4',
    value: 'start-4',
    labelPlacement: 'start' as 'top' | 'bottom' | 'end' | 'start' | undefined,
  },
  {
    label: 'end-4',
    value: 'end-4',
    labelPlacement: 'end' as 'top' | 'bottom' | 'end' | 'start' | undefined,
  },
]

export default function UiKitFields() {
  const [selectedValue, setSelectedValue] = useState<string>()
  const [radioGroupValue, setRadioGroupValue] = useState<string>()

  return (
    <Stack
      gap={theme => theme.spacing(2)}
      justifyContent={`flex-start`}
      paddingBottom={theme => theme.spacing(10)}
    >
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
        <UiTextField label={'error'} error helperText={`there is error`} />

        <UiTextField
          label={'label'}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <UiTextField
          label={'label'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <UiTextField
          label={'label'}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <AccountCircle />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />

        <UiTextField label={'success'} placeholder={'placeholder'} color='success' />
        <UiTextField label={'error'} placeholder={'placeholder'} color='error' />
        <UiTextField label={'warning'} placeholder={'placeholder'} color='warning' />
        <UiTextField label={'info'} placeholder={'placeholder'} color='info' />
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
        <UiSelectField
          label={'label'}
          selectOptions={SELECT_OPTIONS}
          value={selectedValue}
          updateValue={setSelectedValue}
          errorMessage={'there is error'}
        />

        <UiSelectField
          label={'label'}
          selectOptions={SELECT_OPTIONS.map(el => ({
            ...el,
            adornmentLeft: <Delete />,
          }))}
          value={selectedValue}
          updateValue={setSelectedValue}
        />

        <UiSelectField
          label={'label'}
          selectOptions={SELECT_OPTIONS.map(el => ({
            ...el,
            adornmentRight: <Delete />,
          }))}
          value={selectedValue}
          updateValue={setSelectedValue}
        />

        <UiSelectField
          label={'label'}
          selectOptions={SELECT_OPTIONS.map(el => ({
            ...el,
            adornmentLeft: <Delete />,
            adornmentRight: <Delete />,
          }))}
          value={selectedValue}
          updateValue={setSelectedValue}
        />
      </Stack>

      <Typography variant={`h6`}>{`Checkbox`}</Typography>
      <Stack
        direction={'row'}
        flexWrap={`wrap`}
        gap={theme => theme.spacing(2)}
        justifyContent={`flex-start`}
      >
        <UiCheckbox />
        <UiCheckbox disabled />
        <UiCheckbox label={'label'} />
        <UiCheckbox label={'label'} disabled />
        <UiCheckbox label={'label'} required />
      </Stack>

      <Typography variant={`h6`}>{`Radio group`}</Typography>
      <Typography>{`Radio group value: ${radioGroupValue}`}</Typography>
      <Grid2 container spacing={2} gap={theme => theme.spacing(2)} justifyContent={`flex-start`}>
        <Grid2 xs={1}>
          <UiRadioGroup groupOptions={RADIO_GROUP_OPTIONS} updateValue={setRadioGroupValue} />
        </Grid2>
      </Grid2>
    </Stack>
  )
}

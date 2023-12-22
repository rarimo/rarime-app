import { AccountCircle, Delete } from '@mui/icons-material'
import { InputAdornment, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { UiCheckbox, UiSelectField, UiTextField } from '@/ui'

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
  const [selectedValue, setSelectedValue] = useState<string>()

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

      <Typography variant={`h6`}>{`Select`}</Typography>
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
    </Stack>
  )
}

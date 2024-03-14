import { InputAdornment, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { Icons } from '@/enums'
import { UiCheckbox, UiIcon, UiRadioGroup, UiSelect, UiSwitch, UiTextField } from '@/ui'

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
      justifyContent='flex-start'
      paddingBottom={theme => theme.spacing(10)}
    >
      <Typography variant='h6'>Input</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <UiTextField />
        <UiTextField label='label' />
        <UiTextField placeholder='placeholder' />
        <UiTextField label='label' placeholder='placeholder' />
        <UiTextField label='disabled' disabled={true} />
        <UiTextField label='error' error errorMessage='there is error' />

        <UiTextField
          label='label'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <UiIcon name={Icons.Bell} />
              </InputAdornment>
            ),
          }}
        />

        <UiTextField
          label='label'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <UiIcon name={Icons.Bell} />
              </InputAdornment>
            ),
          }}
        />

        <UiTextField
          label='label'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <UiIcon name={Icons.Bell} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position='end'>
                <UiIcon name={Icons.Bell} />
              </InputAdornment>
            ),
          }}
        />

        <UiTextField label='success' placeholder='placeholder' color='success' />
        <UiTextField label='error' placeholder='placeholder' color='error' />
        <UiTextField label='warning' placeholder='placeholder' color='warning' />
        <UiTextField label='info' placeholder='placeholder' color='info' />
      </Stack>

      <Typography variant='h6'>Select</Typography>
      <Typography>{`Selected value: ${selectedValue}`}</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <UiSelect options={SELECT_OPTIONS} value={selectedValue} updateValue={setSelectedValue} />
        <UiSelect
          label='label'
          options={SELECT_OPTIONS}
          value={selectedValue}
          updateValue={setSelectedValue}
        />
        <UiSelect
          label='label'
          options={SELECT_OPTIONS}
          value={selectedValue}
          updateValue={setSelectedValue}
          errorMessage='there is error'
        />

        <UiSelect
          label='label'
          options={SELECT_OPTIONS.map(el => ({
            ...el,
            adornmentLeft: <UiIcon name={Icons.Bell} />,
          }))}
          value={selectedValue}
          updateValue={setSelectedValue}
        />

        <UiSelect
          label='label'
          options={SELECT_OPTIONS.map(el => ({
            ...el,
            adornmentRight: <UiIcon name={Icons.Bell} />,
          }))}
          value={selectedValue}
          updateValue={setSelectedValue}
        />

        <UiSelect
          label='label'
          options={SELECT_OPTIONS.map(el => ({
            ...el,
            adornmentLeft: <UiIcon name={Icons.Bell} />,
            adornmentRight: <UiIcon name={Icons.Bell} />,
          }))}
          value={selectedValue}
          updateValue={setSelectedValue}
        />
      </Stack>

      <Typography variant='h6'>Checkbox</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <UiCheckbox />
        <UiCheckbox disabled />
        <UiCheckbox label='label' />
        <UiCheckbox label='label' disabled />
        <UiCheckbox label='label' required />
      </Stack>

      <Typography variant='h6'>Radio group</Typography>
      <Typography>{`Radio group value: ${radioGroupValue}`}</Typography>
      <UiRadioGroup groupOptions={RADIO_GROUP_OPTIONS} updateValue={setRadioGroupValue} />

      <Typography variant='h6'>Switch Field</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <UiSwitch />
        <UiSwitch disabled />
        <UiSwitch defaultChecked />
        <UiSwitch defaultChecked disabled />

        <UiSwitch label='label' />
        <UiSwitch label='label' disabled />
        <UiSwitch label='label' defaultChecked />
        <UiSwitch label='label' defaultChecked disabled />
      </Stack>
    </Stack>
  )
}

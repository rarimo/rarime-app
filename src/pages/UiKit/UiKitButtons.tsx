import { Stack, Typography } from '@mui/material'

import { Icons } from '@/enums'
import { UiButton, UiIcon, UiIconButton } from '@/ui'

export default function UiKitButtons() {
  return (
    <Stack gap={theme => theme.spacing(4)} justifyContent='flex-start'>
      <Typography variant='h6'>Text</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <UiButton variant='text'>Text</UiButton>
        <UiButton variant='text' disabled={true}>
          Disabled
        </UiButton>
        <UiButton variant='text' href='#'>
          Link
        </UiButton>

        <UiButton variant='text' size='small'>
          Small
        </UiButton>
        <UiButton variant='text' size='medium'>
          Medium
        </UiButton>
        <UiButton variant='text' size='large'>
          Large
        </UiButton>

        <UiButton variant='text' color='secondary'>
          Secondary
        </UiButton>
        <UiButton variant='text' color='success'>
          Success
        </UiButton>
        <UiButton variant='text' color='error'>
          Error
        </UiButton>
        <UiButton variant='text' color='info'>
          Info
        </UiButton>
        <UiButton variant='text' color='warning'>
          Warning
        </UiButton>

        {/*ICONS*/}
        <UiButton variant='text' startIcon={<UiIcon name={Icons.Bell} />}>
          Text
        </UiButton>
        <UiButton variant='text' endIcon={<UiIcon name={Icons.TrashSimple} />}>
          Text
        </UiButton>
        <UiButton
          variant='text'
          startIcon={<UiIcon name={Icons.TrashSimple} />}
          endIcon={<UiIcon name={Icons.TrashSimple} />}
        >
          Text
        </UiButton>
        <UiButton variant='text'>
          <UiIcon name={Icons.TrashSimple} />
        </UiButton>
      </Stack>

      <Typography variant='h6'>Contained</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <UiButton variant='contained'>Contained</UiButton>
        <UiButton variant='contained' disabled={true}>
          Disabled
        </UiButton>
        <UiButton variant='contained' href='#'>
          Link
        </UiButton>

        <UiButton variant='contained' size='small'>
          Small
        </UiButton>
        <UiButton variant='contained' size='medium'>
          Medium
        </UiButton>
        <UiButton variant='contained' size='large'>
          Large
        </UiButton>

        <UiButton variant='contained' color='secondary'>
          Secondary
        </UiButton>
        <UiButton variant='contained' color='success'>
          Success
        </UiButton>
        <UiButton variant='contained' color='error'>
          Error
        </UiButton>
        <UiButton variant='contained' color='info'>
          Info
        </UiButton>
        <UiButton variant='contained' color='warning'>
          Warning
        </UiButton>

        {/*ICONS*/}
        <UiButton variant='contained' startIcon={<UiIcon name={Icons.TrashSimple} />}>
          Text
        </UiButton>
        <UiButton variant='contained' endIcon={<UiIcon name={Icons.TrashSimple} />}>
          Text
        </UiButton>
        <UiButton
          variant='contained'
          startIcon={<UiIcon name={Icons.TrashSimple} />}
          endIcon={<UiIcon name={Icons.TrashSimple} />}
        >
          Text
        </UiButton>
        <UiButton variant='contained'>
          <UiIcon name={Icons.TrashSimple} />
        </UiButton>
      </Stack>

      <Typography variant='h6'>Outlined</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <UiButton variant='outlined'>Outlined</UiButton>
        <UiButton variant='outlined' disabled={true}>
          Disabled
        </UiButton>
        <UiButton variant='outlined' href='#'>
          Link
        </UiButton>

        <UiButton variant='outlined' size='small'>
          Small
        </UiButton>
        <UiButton variant='outlined' size='medium'>
          Medium
        </UiButton>
        <UiButton variant='outlined' size='large'>
          Large
        </UiButton>

        <UiButton variant='outlined' color='secondary'>
          Secondary
        </UiButton>
        <UiButton variant='outlined' color='success'>
          Success
        </UiButton>
        <UiButton variant='outlined' color='error'>
          Error
        </UiButton>
        <UiButton variant='outlined' color='info'>
          Info
        </UiButton>
        <UiButton variant='outlined' color='warning'>
          Warning
        </UiButton>

        {/*ICONS*/}
        <UiButton variant='outlined' startIcon={<UiIcon name={Icons.TrashSimple} />}>
          Text
        </UiButton>
        <UiButton variant='outlined' endIcon={<UiIcon name={Icons.TrashSimple} />}>
          Text
        </UiButton>
        <UiButton
          variant='outlined'
          startIcon={<UiIcon name={Icons.TrashSimple} />}
          endIcon={<UiIcon name={Icons.TrashSimple} />}
        >
          Text
        </UiButton>
        <UiButton variant='outlined'>
          <UiIcon name={Icons.TrashSimple} />
        </UiButton>
      </Stack>

      <Typography variant='h6'>Icon Button</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <UiIconButton>
          <UiIcon name={Icons.TrashSimple} />
        </UiIconButton>
        <UiIconButton disabled={true}>
          <UiIcon name={Icons.TrashSimple} />
        </UiIconButton>
      </Stack>

      {/*SIZES*/}
      <Typography variant='h6'>Sizes</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <UiButton size='small'>Small button</UiButton>
        <UiButton size='medium'>Medium button</UiButton>
        <UiButton size='large'>Large button</UiButton>
        <UiButton>Default button</UiButton>
      </Stack>
    </Stack>
  )
}

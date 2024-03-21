import { Button, IconButton, Stack, Typography } from '@mui/material'

import { Icons } from '@/enums'
import { UiIcon } from '@/ui'

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
        <Button variant='text'>Text</Button>
        <Button variant='text' disabled={true}>
          Disabled
        </Button>
        <Button variant='text' href='#'>
          Link
        </Button>

        <Button variant='text' size='small'>
          Small
        </Button>
        <Button variant='text' size='medium'>
          Medium
        </Button>
        <Button variant='text' size='large'>
          Large
        </Button>

        <Button variant='text' color='secondary'>
          Secondary
        </Button>
        <Button variant='text' color='success'>
          Success
        </Button>
        <Button variant='text' color='error'>
          Error
        </Button>
        <Button variant='text' color='info'>
          Info
        </Button>
        <Button variant='text' color='warning'>
          Warning
        </Button>

        {/*ICONS*/}
        <Button variant='text' startIcon={<UiIcon name={Icons.Bell} />}>
          Text
        </Button>
        <Button variant='text' endIcon={<UiIcon name={Icons.TrashSimple} />}>
          Text
        </Button>
        <Button
          variant='text'
          startIcon={<UiIcon name={Icons.TrashSimple} />}
          endIcon={<UiIcon name={Icons.TrashSimple} />}
        >
          Text
        </Button>
        <Button variant='text'>
          <UiIcon name={Icons.TrashSimple} />
        </Button>
      </Stack>

      <Typography variant='h6'>Contained</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <Button variant='contained'>Contained</Button>
        <Button variant='contained' disabled={true}>
          Disabled
        </Button>
        <Button variant='contained' href='#'>
          Link
        </Button>

        <Button variant='contained' size='small'>
          Small
        </Button>
        <Button variant='contained' size='medium'>
          Medium
        </Button>
        <Button variant='contained' size='large'>
          Large
        </Button>

        <Button variant='contained' color='secondary'>
          Secondary
        </Button>
        <Button variant='contained' color='success'>
          Success
        </Button>
        <Button variant='contained' color='error'>
          Error
        </Button>
        <Button variant='contained' color='info'>
          Info
        </Button>
        <Button variant='contained' color='warning'>
          Warning
        </Button>

        {/*ICONS*/}
        <Button variant='contained' startIcon={<UiIcon name={Icons.TrashSimple} />}>
          Text
        </Button>
        <Button variant='contained' endIcon={<UiIcon name={Icons.TrashSimple} />}>
          Text
        </Button>
        <Button
          variant='contained'
          startIcon={<UiIcon name={Icons.TrashSimple} />}
          endIcon={<UiIcon name={Icons.TrashSimple} />}
        >
          Text
        </Button>
        <Button variant='contained'>
          <UiIcon name={Icons.TrashSimple} />
        </Button>
      </Stack>

      <Typography variant='h6'>Outlined</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <Button variant='outlined'>Outlined</Button>
        <Button variant='outlined' disabled={true}>
          Disabled
        </Button>
        <Button variant='outlined' href='#'>
          Link
        </Button>

        <Button variant='outlined' size='small'>
          Small
        </Button>
        <Button variant='outlined' size='medium'>
          Medium
        </Button>
        <Button variant='outlined' size='large'>
          Large
        </Button>

        <Button variant='outlined' color='secondary'>
          Secondary
        </Button>
        <Button variant='outlined' color='success'>
          Success
        </Button>
        <Button variant='outlined' color='error'>
          Error
        </Button>
        <Button variant='outlined' color='info'>
          Info
        </Button>
        <Button variant='outlined' color='warning'>
          Warning
        </Button>

        {/*ICONS*/}
        <Button variant='outlined' startIcon={<UiIcon name={Icons.TrashSimple} />}>
          Text
        </Button>
        <Button variant='outlined' endIcon={<UiIcon name={Icons.TrashSimple} />}>
          Text
        </Button>
        <Button
          variant='outlined'
          startIcon={<UiIcon name={Icons.TrashSimple} />}
          endIcon={<UiIcon name={Icons.TrashSimple} />}
        >
          Text
        </Button>
        <Button variant='outlined'>
          <UiIcon name={Icons.TrashSimple} />
        </Button>
      </Stack>

      <Typography variant='h6'>Icon Button</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <IconButton>
          <UiIcon name={Icons.TrashSimple} />
        </IconButton>
        <IconButton disabled={true}>
          <UiIcon name={Icons.TrashSimple} />
        </IconButton>
      </Stack>

      {/*SIZES*/}
      <Typography variant='h6'>Sizes</Typography>
      <Stack
        direction='row'
        flexWrap='wrap'
        gap={theme => theme.spacing(2)}
        justifyContent='flex-start'
      >
        <Button size='small'>Small button</Button>
        <Button size='medium'>Medium button</Button>
        <Button size='large'>Large button</Button>
        <Button>Default button</Button>
      </Stack>
    </Stack>
  )
}

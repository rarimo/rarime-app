import { Button, Drawer, Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { BusEvents, Icons } from '@/enums'
import { bus } from '@/helpers'
import { UiCopyField, UiIcon, UiInfoAlert, UiPopup } from '@/ui'

export default function UiKitOther() {
  const [isDrawerShown, setIsDrawerShown] = useState(false)

  const showToast = (variant: BusEvents) => {
    bus.emit(variant, {
      message: `This is a ${variant} message, This is a ${variant} message, This is a ${variant} message, This is a ${variant} message, This is a ${variant} message, This is a ${variant} message`,
    })
  }

  return (
    <Stack spacing={8}>
      <Stack spacing={2}>
        <Typography variant='h6'>Copy field</Typography>
        <Stack
          direction='row'
          flexWrap='wrap'
          gap={theme => theme.spacing(2)}
          justifyContent='flex-start'
        >
          <UiCopyField label='Address' value='ox182374698127364asdjkfb!' />
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant='h6'>Info chip</Typography>
        <Stack
          direction='row'
          flexWrap='wrap'
          gap={theme => theme.spacing(2)}
          justifyContent='flex-start'
        >
          <UiInfoAlert
            message='success lorem ipsum dolor sit amet concestetur!'
            severity='success'
          />
          <UiInfoAlert
            message='warning lorem ipsum dolor sit amet concestetur!'
            severity='warning'
          />
          <UiInfoAlert message='error lorem ipsum dolor sit amet concestetur!' severity='error' />
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant='h6'>Icons</Typography>
        <Stack
          direction='row'
          flexWrap='wrap'
          gap={theme => theme.spacing(2)}
          justifyContent='flex-start'
        >
          <UiIcon name={Icons.Metamask} />
          <UiIcon name={Icons.TrashSimple} />
          <UiIcon name={Icons.Bell} />
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant='h6'>Popup</Typography>

        <UiPopup
          trigger={<Button>Popup</Button>}
          menuItems={[
            <Button key={0} variant='text' startIcon={<UiIcon name={Icons.Plus} />}>
              Item 1
            </Button>,
            <Button key={1} variant='text' startIcon={<UiIcon name={Icons.Plus} />}>
              Item 2
            </Button>,
            <Button key={2} variant='text' startIcon={<UiIcon name={Icons.Plus} />}>
              Item 3
            </Button>,
          ]}
        />
      </Stack>

      <Stack spacing={2}>
        <Typography variant='h6'>Drawer</Typography>
        <Stack
          direction='row'
          flexWrap='wrap'
          gap={theme => theme.spacing(2)}
          justifyContent='flex-start'
        >
          <Button onClick={() => setIsDrawerShown(prev => !prev)}>Toggle Drawer</Button>
          <Drawer open={isDrawerShown} onClose={() => setIsDrawerShown(false)}>
            <Stack
              direction='row'
              flexWrap='wrap'
              gap={theme => theme.spacing(2)}
              justifyContent='flex-start'
            >
              <Typography variant='h6'>This is a drawer</Typography>
            </Stack>
          </Drawer>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant='h6'>Toasts manager</Typography>
        <Stack
          direction='row'
          flexWrap='wrap'
          gap={theme => theme.spacing(2)}
          justifyContent='flex-start'
        >
          <Button
            onClick={() => {
              showToast(BusEvents.success)
            }}
            color='success'
          >
            Success message
          </Button>

          <Button
            onClick={() => {
              showToast(BusEvents.error)
            }}
            color='error'
          >
            Error message
          </Button>

          <Button
            onClick={() => {
              showToast(BusEvents.warning)
            }}
            color='warning'
          >
            Warning message
          </Button>

          <Button
            onClick={() => {
              showToast(BusEvents.info)
            }}
            color='info'
          >
            Info message
          </Button>

          <Button
            onClick={() => {
              bus.emit(BusEvents.success, {
                message: (
                  <a href='https://google.com' target='_blank' rel='noreferrer'>
                    Google Link
                  </a>
                ),
              })
            }}
            color='info'
          >
            Tx message
          </Button>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant='h6'>Typography</Typography>
        <Stack spacing={4} justifyContent='flex-start'>
          <Typography variant='h1'>Heading 1</Typography>
          <Typography variant='h2'>Heading 2</Typography>
          <Typography variant='h3'>Heading 3</Typography>
          <Typography variant='h4'>Heading 4</Typography>
          <Typography variant='h5'>Heading 5</Typography>
          <Typography variant='h6'>Heading 6</Typography>

          <Typography variant='subtitle1'>Subtitle 1</Typography>
          <Typography variant='subtitle2'>Subtitle 2</Typography>
          <Typography variant='subtitle3'>Subtitle 3</Typography>
          <Typography variant='subtitle4'>Subtitle 4</Typography>
          <Typography variant='subtitle5'>Subtitle 5</Typography>

          <Typography variant='body1'>Body 1</Typography>
          <Typography variant='body2'>Body 2</Typography>
          <Typography variant='body3'>Body 3</Typography>
          <Typography variant='body4'>Body 4</Typography>

          <Typography variant='buttonLarge'>Button large</Typography>
          <Typography variant='buttonMedium'>Button medium</Typography>
          <Typography variant='buttonSmall'>Button small</Typography>

          <Typography variant='caption1'>Caption 1</Typography>
          <Typography variant='caption2'>Caption 2</Typography>
          <Typography variant='caption3'>Caption 3</Typography>

          <Typography variant='overline1'>Overline 1</Typography>
          <Typography variant='overline2'>Overline 2</Typography>
          <Typography variant='overline3'>Overline 3</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

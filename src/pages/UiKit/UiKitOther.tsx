import { Stack, Typography } from '@mui/material'
import { useState } from 'react'

import { BusEvents, Icons } from '@/enums'
import { bus } from '@/helpers'
import { UiBasicModal, UiButton, UiDrawer, UiIcon, UiModal } from '@/ui'

export default function UiKitOther() {
  const [isDrawerShown, setIsDrawerShown] = useState(false)
  const [isModalShown, setIsModalShown] = useState(false)
  const [isBasicModalShown, setIsBasicModalShown] = useState(false)

  const showToast = (variant: BusEvents) => {
    bus.emit(variant, {
      message: `This is a ${variant} message, This is a ${variant} message, This is a ${variant} message, This is a ${variant} message, This is a ${variant} message, This is a ${variant} message`,
    })
  }

  return (
    <Stack
      gap={theme => theme.spacing(2)}
      justifyContent={`flex-start`}
      paddingBottom={theme => theme.spacing(10)}
    >
      <Typography variant={`h6`}>{`Icons`}</Typography>
      <Stack
        direction={'row'}
        flexWrap={`wrap`}
        gap={theme => theme.spacing(2)}
        justifyContent={`flex-start`}
      >
        <UiIcon name={Icons.Metamask} />
        {<UiIcon componentName='delete' />}
        {<UiIcon componentName='accountCircle' />}
      </Stack>

      <Typography variant={`h6`}>{`Drawer`}</Typography>
      <Stack
        direction={'row'}
        flexWrap={`wrap`}
        gap={theme => theme.spacing(2)}
        justifyContent={`flex-start`}
      >
        <UiButton onClick={() => setIsDrawerShown(prev => !prev)}>{`Toggle Drawer`}</UiButton>
        <UiDrawer anchor='right' open={isDrawerShown} onClose={() => setIsDrawerShown(false)}>
          <Stack
            direction={'row'}
            flexWrap={`wrap`}
            gap={theme => theme.spacing(2)}
            justifyContent={`flex-start`}
          >
            <Typography variant={`h6`}>{`This is a drawer`}</Typography>
          </Stack>
        </UiDrawer>
      </Stack>

      <Typography variant={`h6`}>{`Modal`}</Typography>
      <Stack
        direction={'row'}
        flexWrap={`wrap`}
        gap={theme => theme.spacing(2)}
        justifyContent={`flex-start`}
      >
        <UiButton onClick={() => setIsModalShown(prev => !prev)}>{`Toggle Modal`}</UiButton>
        <UiModal open={isModalShown} onClose={() => setIsModalShown(false)}>
          <Stack
            direction={'row'}
            flexWrap={`wrap`}
            gap={theme => theme.spacing(2)}
            justifyContent={`flex-start`}
          >
            <Typography>{`This is a Modal`}</Typography>
          </Stack>
        </UiModal>

        <UiButton
          onClick={() => setIsBasicModalShown(prev => !prev)}
        >{`Toggle BasicModal`}</UiButton>

        <UiBasicModal open={isBasicModalShown} onClose={() => setIsBasicModalShown(false)}>
          <Typography>
            {`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque ex expedita fuga fugit, harum, ipsum iusto magni modi natus, nostrum placeat quaerat quo. Nostrum quasi recusandae sint sunt tempore.`}
          </Typography>
        </UiBasicModal>
      </Stack>

      <Typography variant={`h6`}>{`Toasts manager`}</Typography>
      <Stack
        direction={'row'}
        flexWrap={`wrap`}
        gap={theme => theme.spacing(2)}
        justifyContent={`flex-start`}
      >
        <UiButton
          onClick={() => {
            showToast(BusEvents.success)
          }}
          color={`success`}
        >
          {`Success message`}
        </UiButton>

        <UiButton
          onClick={() => {
            showToast(BusEvents.error)
          }}
          color={`error`}
        >
          {`Error message`}
        </UiButton>

        <UiButton
          onClick={() => {
            showToast(BusEvents.warning)
          }}
          color={`warning`}
        >
          {`Warning message`}
        </UiButton>

        <UiButton
          onClick={() => {
            showToast(BusEvents.info)
          }}
          color={`info`}
        >
          {`Info message`}
        </UiButton>
      </Stack>
    </Stack>
  )
}

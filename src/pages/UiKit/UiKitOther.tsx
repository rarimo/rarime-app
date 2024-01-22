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
    <Stack spacing={8}>
      <Stack spacing={2}>
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
      </Stack>

      <Stack spacing={2}>
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
      </Stack>

      <Stack spacing={2}>
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
      </Stack>

      <Stack spacing={2}>
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

      <Stack spacing={2}>
        <Typography variant={`h6`}>{`Typography`}</Typography>
        <Stack spacing={4} justifyContent={`flex-start`}>
          <Typography variant={`h1`}>{`Heading 1`}</Typography>
          <Typography variant={`h2`}>{`Heading 2`}</Typography>
          <Typography variant={`h3`}>{`Heading 3`}</Typography>
          <Typography variant={`h4`}>{`Heading 4`}</Typography>
          <Typography variant={`h5`}>{`Heading 5`}</Typography>
          <Typography variant={`h6`}>{`Heading 6`}</Typography>

          <Typography variant={`subtitle1`}>{`Subtitle 1`}</Typography>
          <Typography variant={`subtitle2`}>{`Subtitle 2`}</Typography>
          <Typography variant={`subtitle3`}>{`Subtitle 3`}</Typography>
          <Typography variant={`subtitle4`}>{`Subtitle 4`}</Typography>
          <Typography variant={`subtitle5`}>{`Subtitle 5`}</Typography>

          <Typography variant={`body1`}>{`Body 1`}</Typography>
          <Typography variant={`body2`}>{`Body 2`}</Typography>
          <Typography variant={`body3`}>{`Body 3`}</Typography>
          <Typography variant={`body4`}>{`Body 4`}</Typography>

          <Typography variant={`buttonLarge`}>{`Button large`}</Typography>
          <Typography variant={`buttonMedium`}>{`Button medium`}</Typography>
          <Typography variant={`buttonSmall`}>{`Button small`}</Typography>

          <Typography variant={`caption1`}>{`Caption 1`}</Typography>
          <Typography variant={`caption2`}>{`Caption 2`}</Typography>
          <Typography variant={`caption3`}>{`Caption 3`}</Typography>

          <Typography variant={`overline1`}>{`Overline 1`}</Typography>
          <Typography variant={`overline2`}>{`Overline 2`}</Typography>
          <Typography variant={`overline3`}>{`Overline 3`}</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}

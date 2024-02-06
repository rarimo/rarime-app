import {
  Avatar,
  Input,
  type InputProps,
  Stack,
  type StackProps,
  Typography,
  useTheme,
} from '@mui/material'
import { ChangeEvent, forwardRef, useCallback, useMemo } from 'react'

import { UiIcon } from '@/ui'

interface Props extends Omit<InputProps, 'value' | 'onChange'> {
  label?: string
  stackProps?: StackProps
  value?: File
  onChange?: (value: File) => void
  // TODO: add errorMessage
}

const AVATAR_SIZE = 19

const UiImageUploader = forwardRef<HTMLInputElement, Props>(
  ({ label, stackProps, value, onChange, ...rest }: Props, ref) => {
    const { palette, spacing } = useTheme()

    const avatarSize = {
      width: spacing(AVATAR_SIZE),
      height: spacing(AVATAR_SIZE),
    }

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget?.files?.[0]) return

        const [file] = e.currentTarget.files

        onChange?.(file)
      },
      [onChange],
    )

    const valueUrl = useMemo(() => {
      if (!value) return ''

      try {
        return URL.createObjectURL(value)
      } catch (error) {
        return ''
      }
    }, [value])

    return (
      <Stack {...stackProps} position='relative' direction='row' alignItems='center' spacing={6}>
        {(!!valueUrl && (
          <Avatar
            src={valueUrl}
            sx={{
              ...avatarSize,
            }}
          />
        )) || (
          <Stack
            {...avatarSize}
            justifyContent='center'
            alignItems='center'
            bgcolor={palette.background.default}
            borderRadius={'50%'}
          >
            <UiIcon componentName='addPhotoAlternativeOutlined' size={6} />
          </Stack>
        )}
        <Typography variant='subtitle4'>{value?.name || label || 'Upload image'}</Typography>
        <Input
          {...rest}
          onChange={handleChange}
          inputRef={ref}
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            opacity: 0,
          }}
          type='file'
          inputProps={{
            accept: 'image/*',
            multiple: false,
          }}
        />
      </Stack>
    )
  },
)

export default UiImageUploader

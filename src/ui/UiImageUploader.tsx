import { Avatar, Input, type InputProps, Stack, type StackProps, Typography } from '@mui/material'
import { ChangeEvent, forwardRef, useCallback, useMemo } from 'react'

import { useThemeMode } from '@/hooks'
import UiIcon from '@/ui/UiIcon'

interface Props extends Omit<InputProps, 'value' | 'onChange'> {
  label?: string
  stackProps?: StackProps
  value?: File
  onChange?: (value: File) => void
}

const AVATAR_SIZE = 19

const UiImageUploader = forwardRef<HTMLInputElement, Props>(
  ({ label, stackProps, value, onChange, ...rest }: Props, ref) => {
    const { theme } = useThemeMode()

    const avatarSize = {
      width: theme.spacing(AVATAR_SIZE),
      height: theme.spacing(AVATAR_SIZE),
    }

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget?.files?.[0]) return

        const [file] = e.currentTarget.files

        onChange?.(file)
      },
      [onChange],
    )

    const validValue = useMemo(() => {
      if (!value) return ''

      try {
        return URL.createObjectURL(value)
      } catch (error) {
        return ''
      }
    }, [value])

    return (
      <Stack {...stackProps} position='relative' direction='row' alignItems='center' gap={6}>
        {(!!validValue && (
          <Avatar
            src={validValue}
            sx={{
              ...avatarSize,
            }}
          />
        )) || (
          <Stack
            {...avatarSize}
            justifyContent='center'
            alignItems='center'
            bgcolor={theme.palette.background.default}
            borderRadius={'50%'}
          >
            <UiIcon componentName='addPhotoAlternativeOutlined' size={6} />
          </Stack>
        )}
        <Typography>{value?.name || label || 'Upload image'}</Typography>
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

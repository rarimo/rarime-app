import { TextFieldProps, useMediaQuery } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { type Dayjs } from 'dayjs'
import { useMemo } from 'react'

import { useThemeMode } from '@/hooks'

interface Props extends DatePickerProps<Dayjs> {
  errorMessage?: string
}

export default function UiDatePicker({ errorMessage, ...rest }: Props) {
  const { theme } = useThemeMode()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))

  const textFieldProps = useMemo<Partial<TextFieldProps>>(
    () => ({
      error: !!errorMessage,
      helperText: errorMessage,
    }),
    [errorMessage],
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        {isSm ? (
          <MobileDatePicker
            {...rest}
            slotProps={{
              textField: textFieldProps,
            }}
          />
        ) : (
          <DatePicker
            {...rest}
            slotProps={{
              textField: textFieldProps,
            }}
          />
        )}
      </DemoContainer>
    </LocalizationProvider>
  )
}

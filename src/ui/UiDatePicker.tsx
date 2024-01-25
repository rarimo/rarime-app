import { time, type TimeDate } from '@distributedlab/tools'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { forwardRef, useCallback, useMemo } from 'react'

type Props = Omit<DatePickerProps<TimeDate>, 'onChange'> & {
  errorMessage?: string
  onChange?: (v: string) => void
}

// FIXME: to make this component be controlled - value shouldn't be undefined || null,
//  but if it is - we can't show user empty input
const UiDatePicker = forwardRef<HTMLInputElement, Props>(
  ({ errorMessage, ...rest }: Props, ref) => {
    const minDate = useMemo(() => {
      if (!rest.minDate) return undefined

      return time(rest.minDate).dayjs
    }, [rest])

    const maxDate = useMemo(() => {
      if (!rest.maxDate) return undefined

      return time(rest.maxDate).dayjs
    }, [rest])

    const value = useMemo(() => {
      if (!rest.value) return undefined

      return time(rest.value).dayjs
    }, [rest.value])

    const handleChange = useCallback(
      (v: TimeDate) => {
        if (!v) return

        rest.onChange?.(time(v).format())
      },
      [rest],
    )

    const pickerProps = useMemo<DatePickerProps<TimeDate>>(() => {
      return {
        ...rest,
        inputRef: ref,
        value: value || time().dayjs,
        onChange: v => handleChange(v),
        minDate,
        maxDate,

        slotProps: {
          textField: {
            error: !!errorMessage,
            helperText: errorMessage,
          },
        },
      }
    }, [errorMessage, handleChange, maxDate, minDate, ref, rest, value])

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker {...pickerProps} />
        </DemoContainer>
      </LocalizationProvider>
    )
  },
)

export default UiDatePicker

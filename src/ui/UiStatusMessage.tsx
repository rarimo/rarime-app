import { AlertColor } from '@mui/material'
import isObject from 'lodash/isObject'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { BusEvents } from '@/enums'
import { bus } from '@/helpers'
import { ErrorHandlerPayload, StatusMessagePayload } from '@/types'
import { UiSnackbarInfo } from '@/ui'

const STATUS_MESSAGE_AUTO_HIDE_DURATION = 30 * 1000

export default function UiStatusMessage() {
  const { t } = useTranslation()

  const [isStatusMessageShown, setIsStatusMessageShown] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [severity, setSeverity] = useState<AlertColor>('info')

  const getErrorMessage = (error: Error): string => {
    switch (error.constructor) {
      default:
        return t('common.labels.something-wrong')
    }
  }

  const busOnHandler = (severity: AlertColor, payload?: StatusMessagePayload) => {
    let msg = isObject(payload) ? payload?.message ?? '' : payload

    if (severity === BusEvents.error) {
      const err = (payload as ErrorHandlerPayload)?.error
      msg ||= err ? getErrorMessage(err) : t('notifications.default-message-error')
    }
    if (severity === BusEvents.warning) {
      msg ||= t('notifications.default-message-warning')
    }
    if (severity === BusEvents.success) {
      msg ||= t('notifications.default-message-success')
    }
    if (severity === BusEvents.info) {
      msg ||= t('notifications.default-message-info')
    }

    setSeverity(severity)
    setIsStatusMessageShown(true)
    setStatusMessage(msg ?? '')
  }

  bus.on(BusEvents.error, payload => {
    busOnHandler(BusEvents.error, payload)
  })
  bus.on(BusEvents.warning, payload => {
    busOnHandler(BusEvents.warning, payload)
  })
  bus.on(BusEvents.success, payload => {
    busOnHandler(BusEvents.success, payload)
  })
  bus.on(BusEvents.info, payload => {
    busOnHandler(BusEvents.info, payload)
  })

  const clear = () => {
    setIsStatusMessageShown(false)
  }

  return (
    <UiSnackbarInfo
      isOpened={isStatusMessageShown}
      autoHideDuration={STATUS_MESSAGE_AUTO_HIDE_DURATION}
      message={statusMessage}
      severity={severity}
      close={clear}
    />
  )
}

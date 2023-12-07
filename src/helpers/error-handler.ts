import log from 'loglevel'

import { BusEvents } from '@/enums'

import { bus } from './event-bus'

export class ErrorHandler {
  static isError(error: unknown): error is Error {
    return error instanceof Error
  }

  static process(error: unknown, message = ''): void {
    if (!ErrorHandler.isError(error)) return
    bus.emit(BusEvents.error, { error, message })
    ErrorHandler.processWithoutFeedback(error)
  }

  static processWithoutFeedback(error: unknown): void {
    if (!ErrorHandler.isError(error)) return
    log.error(error)
  }
}

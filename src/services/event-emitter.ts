import Emittery from 'emittery'

export type EmitterEvent = 'success' | 'error' | 'warning' | 'info'

export const eventEmitter = new Emittery<Record<EmitterEvent, string>>()

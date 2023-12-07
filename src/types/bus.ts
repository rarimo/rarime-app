import { BusEvents } from '@/enums'

import { StatusMessagePayload } from './base'

export type BusEventMap = {
  [BusEvents.success]: StatusMessagePayload
  [BusEvents.error]: StatusMessagePayload
  [BusEvents.warning]: StatusMessagePayload
  [BusEvents.info]: StatusMessagePayload
}

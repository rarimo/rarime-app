export enum EventsRequestFilters {
  Did = 'did',
  Status = 'status',
  MetaStaticName = 'meta.static.name',
}

export enum EventRequestPageProperties {
  Limit = 'limit',
  Cursor = 'cursor',
  Order = 'order',
}

export enum EventRequestPageOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum EventStatuses {
  Open = 'open',
  Fulfilled = 'fulfilled',
  Claimed = 'claimed',
}

export enum EventMetadataFrequencies {
  OneTime = 'one-time',
  Daily = 'daily',
  Weekly = 'weekly',
  Unlimited = 'unlimited',
  Custom = 'custom',
}

export enum EventNames {
  FreeWeekly = 'free_weekly',
  GetPoh = 'get_poh',
  RefferalCommon = 'referral_common',
  BeReferred = 'be_referred',
}

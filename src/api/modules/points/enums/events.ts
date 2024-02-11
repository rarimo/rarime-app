export enum EventsRequestFilters {
  Did = 'did',
  Status = 'status',
  MetaStaticName = 'meta.static.name',
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

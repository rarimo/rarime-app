export enum OrgGroupRequestStatuses {
  Created = '0',
  Accepted = '1',
  Filled = '2',
  Approved = '3',
  Rejected = '4',
  Submitted = '5',
}

export enum OrgGroupRequestFilters {
  UserDid = 'user_did',
  Status = 'status',
}

export enum OrgGroupRequestIncludes {
  Organization = 'Organization',
  Group = 'Group',
}

export enum OrgGroupRequestPublishingStatuses {
  Created = 'created',
  Transacted = 'transacted',
  Confirmed = 'confirmed',
  Failed = 'failed',
}

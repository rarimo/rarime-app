export enum OrgsStatuses {
  Unverified = '0',
  Verified = '1',
}

export enum OrgsRequestFilters {
  Owner = 'owner',
  UserDid = 'user_did',
  Status = 'status',
  Search = 'search',
}

export enum OrgsIncludes {
  Owner = 'owner',
}

export enum OrgUserRoles {
  Undefined = '0',
  Employee = '1',
  Admin = '2',
  SuperAdmin = '3',
}

export enum OrgsRequestPage {
  Limit = 'limit',
  Number = 'number',
}

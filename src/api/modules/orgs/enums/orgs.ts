export enum OrgsStatuses {
  Unverified = '0',
  Verified = '1',
}

export enum OrgsRequestFilters {
  Owner = 'owner',
  UserDid = 'user_did',
  Status = 'status',
}

export enum OrgsIncludes {
  Organization = 'Organization',
  Owner = 'Owner',
}

export enum OrgUserRoles {
  Undefined = '0',
  Employee = '1',
  Admin = '2',
  SuperAdmin = '3',
}

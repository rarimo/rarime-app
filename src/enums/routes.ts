export enum RoutePaths {
  Root = '/',
  UiKit = '/ui-kit',
  Profiles = '/profiles',
  SignIn = '/sign-in',

  Orgs = '/organisations',
  OrgsList = '/organisations/list',
  OrgsListAll = '/organisations/list/all',
  OrgsListMy = '/organisations/list/my',
  OrgsNew = '/organisations/new',
  OrgsId = '/organisations/:id',
  OrgsIdCheckProof = '/organisations/:id/check-proof',
  OrgsIdGroupsNew = '/organisations/:id/groups/new',
  OrgsIdGroups = '/organisations/:id/groups',
  // TODO: maybe here should be:
  // OrgsIdGroupsId = '/organisations/:id/groups/:groupId',
  OrgsIdGroupsIdList = '/organisations/:id/groups/:groupId/list',
  OrgsIdGroupsIdListStatusSubmitted = '/organisations/:id/groups/:groupId/list/issued',
  OrgsIdGroupsIdListStatusCreated = '/organisations/:id/groups/:groupId/list/pending',
  OrgsIdGroupsIdListStatusFilled = '/organisations/:id/groups/:groupId/list/filled',
}

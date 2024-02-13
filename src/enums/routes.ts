export enum RoutePaths {
  Root = '/',
  UiKit = '/ui-kit',
  SignIn = '/sign-in',

  Dashboard = '/dashboard',

  Orgs = '/organisations',
  OrgsList = '/organisations/list',
  OrgsListAll = '/organisations/list/all',
  OrgsListMy = '/organisations/list/my',
  OrgsNew = '/organisations/new',

  OrgsId = '/organisations/:id',
  OrgsIdGroups = '/organisations/:id/groups',
  OrgsIdGroupsIdList = '/organisations/:id/groups/:groupId/list',
  OrgsIdGroupsIdListStatusSubmitted = '/organisations/:id/groups/:groupId/list/issued',
  OrgsIdGroupsIdListStatusCreated = '/organisations/:id/groups/:groupId/list/pending',
  OrgsIdGroupsIdListStatusFilled = '/organisations/:id/groups/:groupId/list/filled',
  OrgsIdGroupsNew = '/organisations/:id/groups/new',

  VerifyProofAlias = '/v/:id',

  AcceptInvitation = '/i',
  AcceptInvitationEmailVerification = '/i/verify-email',
  AcceptInvitationFillRequest = '/i/fill-request',

  Credentials = '/credentials',
  CredentialsList = '/credentials/list',
  CredentialsRequests = '/credentials/requests',

  Rewards = '/rewards',
  RewardsActive = '/rewards/active',
  RewardsHistory = '/rewards/history',
  RewardsActiveId = '/rewards/active/:id',
  RewardsLeaderboard = '/rewards/leaderboard',
}

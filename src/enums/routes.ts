export enum Routes {
  Root = '/',
  UiKit = '/ui-kit',
  Profiles = '/profiles',
  // FIXME: how to avoid * in the path?
  OrgList = '/organizations/*',
  OrgCreate = '/organizations/create',
  SignIn = '/sign-in',
}

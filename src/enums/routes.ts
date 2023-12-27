export enum Routes {
  Root = '/',
  UiKit = '/ui-kit',
  Profiles = '/profiles',
  // FIXME: how to avoid * in the path?
  Orgs = '/organisations/*',
  OrgNew = '/organisations/new',
  SignIn = '/sign-in',
}

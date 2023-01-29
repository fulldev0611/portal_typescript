import { UserStore } from "app/reducers"

export type UserState = {
  token: string,
  id: string,
  settings: ProfileSettings
};

export type ProfileSettings = {
  firstName: string,
  lastName: string,
  email: string,
  company: string,
};

export type ErrorResponse = {
  message: string | null,
  status: number | null,
};

export type LoginResponse = {
  firstName: string,
  lastName: string,
  email: string,
  company: string,
  id: string,
  token: string,
  type: string,
  refreshToken: string,
};

export type LoginResponseResult = {
  response: LoginResponse,
  error: ErrorResponse | null
};

export interface JwtConsts {
  iat: number,
  exp: number,
};

export type UserToken = UserStore & JwtConsts;

export function typedAction<T extends string>(type: T): { type: T };

export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };

export function typedAction(type: string, payload?: any) {
  return { type, payload };
};

export interface InActiveBetaUser {
  id: string,
  email: string,
};

export type Config = {
  api: {
    account: string,
    workspace: string,
    submgr : string,
  },
};

export interface Workspace {
  id: string,
  name: string,
  userId: string,
  status: string,
  orgId: string,
  workspaceUrl: string,
  description: string
};

export interface DeleteWorkspaceResponse {
  id: string,
  name: string,
  deleted: boolean,
};

export interface KeycloakParsedToken {
  exp: number,
  iat: number,
  auth_time: number,
  jti: string,
  iss: string,
  aud: string,
  sub: string,
  typ: string,
  azp: string,
  nonce: string,
  session_state: string,
  acr: string,
  'allowed-origins': string[],
  realm_access: {
    roles: string[]
  },
  resource_access: {
    account: {
      roles: string[]
    }
  },
  scope: string,
  email_verified: Boolean,
  name: string,
  preferred_username: string,
  given_name: string,
  family_name: string,
  email: string
};

export interface NotificationSettings {
  userId?: string,
  marketing: boolean,
  workspaceStatus: boolean,
  workspaceTemplate: boolean,
  teamUpdates: boolean,
}

export interface Notification {
  id: string,
  label: string,
  description: string,
  enabled: boolean
}

export interface Template {
  id: string,
  name: string,
  version: string,
  userRole: string,
  settings: Settings,
  description: string,
}

export interface Settings {
  id: string,
  idleTime: number,
  leaseTime: number,
  activityWindowStart: number,
  activityWindowEnd: number
};

export interface Integration {
  username: string,
  link: string,
  active: boolean,
}

export interface SideNavItem {
  id: string,
  name: string,
  href: string,
  icon: any,
  current: boolean,
  hidden?: boolean,
}
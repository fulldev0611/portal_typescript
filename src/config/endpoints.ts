const user = '/api/users';
const admin = '/api/admin';
const workspaces = '/api/workspaces';
const templates = '/api/templates';
const integrations = '/api/integrations';
const notifications = '/api/notifications';
const teams = '/api/teams';

// Billing and Pricing endpoints
const plans = '/api/plans';
const plans_current = '/api/plans/current';
const checkout = '/api/payments/checkout' ;
const payment_history = '/api/payments/history';


const UPDATE_USER = `${user}`;
const GET_USER = (userId: string) => `${user}/${userId}`;

const GET_INTEGRATIONS = (userId: string) => `${integrations}/${userId}`
const UPDATE_INTEGRATIONS = (userId: string) => `${integrations}/${userId}`;

const GET_NOTIFICATIONS = (userId: string) => `${notifications}/${userId}`;
const UPDATE_NOTIFICATIONS = (userId: string) => `${notifications}/${userId}`;

const GET_TEAMS = `${teams}`

const ADD_BETA_ACCESS = `${admin}/beta`;
const INVITE_USER = `${admin}/invite`;
const GET_INACTIVE_USERS = `${admin}/beta/inactive`;
const REVOKE_BETA_ACCESS = `${admin}/beta/revoke`;

const GET_ALL_WORKSPACES = `${workspaces}`;
const GET_WORKSPACE = (id:string ) => `${workspaces}/${id}`;
const DELETE_WORKSPACE = (id: string) => `${workspaces}/${id}`;
const GET_ALL_ORG_WORKSPACES = (id: string) => `${workspaces}/organization/${id}`;
const CREATE_ORG_WORKSPACE = `${workspaces}`
const DELETE_ORG_WORKSPACE = (orgId: string, workspaceId: string) => `${workspaces}/organization/${orgId}/workspace/${workspaceId}`
const CREATE_WORKSPACE = `${workspaces}`;
const EDIT_WORKSPACE = (id: string) => `${workspaces}/${id}`;
const OPEN_WORKSPACE = (id: string) => `${workspaces}/open/${id}`;
const GET_WORKSPACE_STATUSES = `${workspaces}/status`;

const GET_TEMPLATES = `${templates}`;


const GET_PLANS = `${plans}`;
const GET_CURRENT = `${plans_current}`;
const GET_PAYMENT_CHECKOUT = `${checkout}`;
const GET_PAYMENT_HISTORY = `${payment_history}`;

export const USER = {
    GET_USER,
    UPDATE_USER,
};

export const INTEGRATIONS = {
    GET_INTEGRATIONS,
    UPDATE_INTEGRATIONS,
};

export const NOTIFICATIONS = {
    GET_NOTIFICATIONS,
    UPDATE_NOTIFICATIONS
};

export const ADMIN = {
    ADD_BETA_ACCESS,
    INVITE_USER,
    GET_INACTIVE_USERS,
    REVOKE_BETA_ACCESS
};

export const WORKSPACES = {
    GET_ALL_WORKSPACES,
    GET_WORKSPACE,
    DELETE_WORKSPACE,
    GET_ALL_ORG_WORKSPACES,
    CREATE_ORG_WORKSPACE,
    DELETE_ORG_WORKSPACE,
    CREATE_WORKSPACE,
    EDIT_WORKSPACE,
    OPEN_WORKSPACE,
    GET_WORKSPACE_STATUSES
};

export const TEMPLATES = {
    GET_TEMPLATES,
}

export const TEAMS = {
    GET_TEAMS,
}

export const BILLING = {
    GET_PLANS,
    GET_CURRENT,
    GET_PAYMENT_CHECKOUT,
    GET_PAYMENT_HISTORY,
    GET_ALL_WORKSPACES,
}
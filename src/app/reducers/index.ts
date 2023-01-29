import { combineReducers } from '@reduxjs/toolkit';
import { workspacesReducer } from '../reducers/workspaces';
import { templatesReducer } from '../reducers/templates';
import { settingsReducer } from './settings';
import { socketReducer } from './socket';
import { integrationReducer } from './integrations';
import { teamsReducer } from './teams';

// TODO needs to be removed in next iteration of cleanup
export interface UserStore {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    company: string,
    token: string,
    type: string,
    refreshToken: string,
}

export const rootReducer = combineReducers({
    settings: settingsReducer,
    workspaces: workspacesReducer,
    templates: templatesReducer,
    socket: socketReducer,
    integrations: integrationReducer,
    teams: teamsReducer,
});

export type RootState = ReturnType<typeof rootReducer>
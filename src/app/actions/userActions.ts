import { UserStore } from "app/reducers"
import { ErrorResponse, KeycloakParsedToken } from "types";
import history from '../utils/history';
import { apiClient } from "middleware/apiClient";
import { AxiosResponse } from "axios";

const api = apiClient();

export interface SetFetcing {
    type: 'SET_FETCHING'
    isFetching: boolean
};

export interface SetUser {
    type: string,
    payload: UserStore
}

export interface LogoutUser {
    type: 'LOGOUT_USER',
    payload: null
};

export const isFetching = (isFetching: boolean): SetFetcing => {
    return { type: 'SET_FETCHING', isFetching }
};

export const logoutUser = (): LogoutUser => {
    const payload = null;
    return { type: 'LOGOUT_USER', payload}
};

export const updateUserSettings = (updatedUser: UserStore): SetUser => {
    const payload = updatedUser;
    return { type: 'SET_USER', payload}
};

export const logoutAction = async (dispatch: any): Promise<void> => {
    await dispatch(logoutUser());
    history.push('/login');
};

export const updateUserAction = (dispatch: any, user: UserStore): void => {
    dispatch(updateUserSettings(user))
}
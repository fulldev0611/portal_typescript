import { AxiosResponse } from "axios";
import { apiClient } from "middleware/apiClient";
import { NotificationSettings } from "types";
import { INTEGRATIONS } from "config/endpoints";
import keycloak from "../keycloak";

export const GET_INTEGRATIONS = 'GET_INTEGRATIONS';
export const GET_INTEGRATIONS_SUCCESS = 'GET_INTEGRATIONS_SUCCESS';
export const GET_INTEGRATIONS_FAILURE = 'GET_INTEGRATIONS_FAILURE';

export const UPDATE_INTEGRATIONS = 'UPDATE_INTEGRATIONS';
export const UPDATE_INTEGRATIONS_SUCCESS = 'UPDATE_INTEGRATIONS_SUCCESS';
export const UPDATE_INTEGRATIONS_FAILURE = 'UODATE_INTEGRATIONS_FAILURE';

const api = apiClient();

interface NotificationsRequest {
    type: string,
    payload: Promise<AxiosResponse>
}

interface NotificationsResponse {
    type: string,
    payload: NotificationSettings
}

interface NotificationsError {
    type: string,
    payload: ErrorMessage
}

interface ErrorMessage { 
    errorMessage: string
}

const dispatchGetIntegrations = (userId: string): NotificationsRequest => {
    return {
        type: GET_INTEGRATIONS,
        payload: api.get(INTEGRATIONS.GET_INTEGRATIONS(userId)),
    };
};

const dispatchGetIntegrationsSuccess = (response: AxiosResponse): NotificationsResponse => {
    return {
        type: GET_INTEGRATIONS_SUCCESS,
        payload: response.data as NotificationSettings,
    };
};

const dispatchGetIntegrationsFailure = (error: any): NotificationsError => {
    return {
        type: GET_INTEGRATIONS_FAILURE,
        payload: error,
    };
};

export const getUserIntegrations = async (dispatch) => {
    const { tokenParsed: { sub: userId } = {} } = keycloak;
    if (!userId) {
        throw new Error('Oh no no no'); //TODO Actually do error handling here
    }
    try { 
        const response = await dispatch(dispatchGetIntegrations(userId)).payload;
        return dispatch(dispatchGetIntegrationsSuccess(response));
    } catch (error) {
        dispatch(dispatchGetIntegrationsFailure(error));
    }
};

const dispatchUpdateIntegrations = (userId: string, payload: NotificationSettings): NotificationsRequest => {
    return {
        type: UPDATE_INTEGRATIONS,
        payload: api.put(INTEGRATIONS.UPDATE_INTEGRATIONS(userId), { payload }),
    };
}

const dispatchUpdateIntegrationsSuccess = (response: AxiosResponse): NotificationsResponse => {
    return {
        type: UPDATE_INTEGRATIONS_SUCCESS,
        payload: response.data as NotificationSettings,
    };
}

const dispatchUpdateIntegrationsFailure = (error: any): NotificationsError => {
    return {
        type: UPDATE_INTEGRATIONS_FAILURE,
        payload: error,
    };
}

export const updateUserIntegrations = async (dispatch, payload: NotificationSettings) => {
    const { tokenParsed: { sub: userId } = {} } = keycloak;
    
    if (!userId) {
        throw new Error('Oh no no no'); //TODO Actually do error handling here
    }
    try {
        const response = await dispatch(dispatchUpdateIntegrations(userId, payload)).payload;
        return dispatch(dispatchUpdateIntegrationsSuccess(response));
    } catch (error) {
        dispatch(dispatchUpdateIntegrationsFailure(error));
    }
};
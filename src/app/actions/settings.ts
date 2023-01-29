import { AxiosResponse } from "axios";
import { apiClient } from "middleware/apiClient";
import { NotificationSettings } from "types";
import { NOTIFICATIONS, USER } from "config/endpoints";
import keycloak from "../keycloak";

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILURE = 'GET_NOTIFICATIONS_FAILURE';

export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const UPDATE_NOTIFICATIONS_SUCCESS = 'UPDATE_NOTIFICATIONS_SUCCESS';
export const UPDATE_NOTIFICATIONS_ERROR = 'UPDATE_NOTIFICATIONS_ERROR';

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
export const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE';

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

const dispatchGetNotifications = (userId: string): NotificationsRequest => {
    return {
        type: GET_NOTIFICATIONS,
        payload: api.get(NOTIFICATIONS.GET_NOTIFICATIONS(userId)),
    };
};

const dispatchGetNotificationsSuccess = (response: AxiosResponse): NotificationsResponse => {
    return {
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: response.data as NotificationSettings,
    };
};

const dispatchGetNotificationsFailure = (error: any): NotificationsError => {
    return {
        type: GET_NOTIFICATIONS_FAILURE,
        payload: error,
    };
};

export const getUserNotificationSettings = async (dispatch) => {
    const { tokenParsed: { sub: userId } = {} } = keycloak;
    
    if (!userId) {
        throw new Error('Oh no no no'); //TODO Actually do error handling here
    }
    try { 
        const response = await dispatch(dispatchGetNotifications(userId)).payload;
        return dispatch(dispatchGetNotificationsSuccess(response));
    } catch (error) {
        dispatch(dispatchGetNotificationsFailure(error));
    }
};

const dispatchUpdateNotifications = (userId: string, payload: NotificationSettings): NotificationsRequest => {
    return {
        type: UPDATE_NOTIFICATIONS,
        payload: api.put(NOTIFICATIONS.UPDATE_NOTIFICATIONS(userId), { payload }),
    };
}

const dispatchUpdateNotificationsSuccess = (response: AxiosResponse): NotificationsResponse => {
    return {
        type: UPDATE_NOTIFICATIONS_SUCCESS,
        payload: response.data as NotificationSettings,
    };
}

const dispatchUpdateNotificationsError = (error: any): NotificationsError => {
    return {
        type: UPDATE_NOTIFICATIONS_ERROR,
        payload: error,
    };
}

export const updateUserNotification = async (dispatch, payload: NotificationSettings) => {
    const { tokenParsed: { sub: userId } = {} } = keycloak;
    
    if (!userId) {
        throw new Error('Oh no no no'); //TODO Actually do error handling here
    }
    try {
        const response = await dispatch(dispatchUpdateNotifications(userId, payload)).payload;
        return dispatch(dispatchUpdateNotificationsSuccess(response));
    } catch (error) {
        dispatch(dispatchUpdateNotificationsError(error));
    }
};

const dispatchUpdateAccount = (userId: string, payload: NotificationSettings): NotificationsRequest => {
    return {
        type: UPDATE_ACCOUNT,
        payload: api.put(NOTIFICATIONS.UPDATE_NOTIFICATIONS(userId), { payload }),
    };
}

const dispatchUpdateAccountSuccess = (response: AxiosResponse): NotificationsResponse => {
    return {
        type: UPDATE_ACCOUNT_SUCCESS,
        payload: response.data as NotificationSettings,
    };
}

const dispatchUpdateAccountError = (error: any): NotificationsError => {
    return {
        type: UPDATE_ACCOUNT_FAILURE,
        payload: error,
    };
}

export const updateAccount = async (dispatch, payload: NotificationSettings) => {
    const { tokenParsed: { sub: userId } = {} } = keycloak;
    
    if (!userId) {
        throw new Error('Oh no no no'); //TODO Actually do error handling here
    }
    try {
        const response = await dispatch(dispatchUpdateAccount(userId, payload)).payload;
        return dispatch(dispatchUpdateAccountSuccess(response));
    } catch (error) {
        dispatch(dispatchUpdateAccountError(error));
    }
};




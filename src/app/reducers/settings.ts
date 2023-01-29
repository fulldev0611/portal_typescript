import { NotificationSettings } from 'types';
import {
    GET_NOTIFICATIONS,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
    UPDATE_NOTIFICATIONS,
    UPDATE_NOTIFICATIONS_SUCCESS,
    UPDATE_NOTIFICATIONS_ERROR,
} from '../actions/settings';

const INITIAL_STATE = { loading: true, notifications: {} as NotificationSettings };

export const settingsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_NOTIFICATIONS:
            return { ...state, loading: true, error: null }
        case GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                notifications: action.payload as NotificationSettings
            }
        case GET_NOTIFICATIONS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case UPDATE_NOTIFICATIONS:
            return { ...state, loading: true, error: null }
        case UPDATE_NOTIFICATIONS_SUCCESS:
            return { 
                ...state,
                loading: false,
                error: false,
                notifications: action.payload as NotificationSettings
            }
        case UPDATE_NOTIFICATIONS_ERROR:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

import { Integration } from 'types';
import { GET_INTEGRATIONS, GET_INTEGRATIONS_FAILURE, GET_INTEGRATIONS_SUCCESS, UPDATE_INTEGRATIONS, UPDATE_INTEGRATIONS_FAILURE, UPDATE_INTEGRATIONS_SUCCESS } from '../actions/integrations';

const INITIAL_STATE = { loading: true, integrations: [] as Integration[] };

export const integrationReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_INTEGRATIONS:
            return { ...state, loading: true, error: null }
        case GET_INTEGRATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                integrations: action.payload as Integration[]
            }
        case GET_INTEGRATIONS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case UPDATE_INTEGRATIONS:
            return { ...state, loading: true, error: null }
        case UPDATE_INTEGRATIONS_SUCCESS:
            return { 
                ...state,
                loading: false,
                error: false,
                integrations: action.payload as Integration[]
            }
        case UPDATE_INTEGRATIONS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

import {
    INIT_SOCKET,
    INIT_SOCKET_SUCCESS,
    INIT_SOCKET_FAILURE,
    CLOSE_SOCKET
} from '../actions/socket';

const INITIAL_STATE = { loading: true, socket: undefined, error: false };


export const socketReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) { 
        case INIT_SOCKET:
            return { ...state, loading: true };
        case INIT_SOCKET_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: false,
                socket: action.socket
            };
        case INIT_SOCKET_FAILURE:
            return { ...state, loading: false, socket: undefined, error: true };
        case CLOSE_SOCKET:
            return { ...state, loading: false, socket: undefined, error: false }
        default:
            return state;
    }
};

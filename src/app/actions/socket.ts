
import { connectWebsocket } from "app/utils/sockets";
import { CloseWebSocket, InitWebSocket, InitWebSocketError, InitWebSocketSuccess } from "types/actions";

export const INIT_SOCKET = 'INIT_SOCKET';
export const INIT_SOCKET_SUCCESS = 'INIT_SOCKET_SUCCESS';
export const INIT_SOCKET_FAILURE = 'INIT_SOCKET_FAILURE';
export const CLOSE_SOCKET = 'CLOSE_SOCKET';

const dispatchInitSocket = (): InitWebSocket => {
    return {
        type: INIT_SOCKET,
        socket: connectWebsocket(),
    };
};

const dispatchInitSocketSuccess = (socket: WebSocket): InitWebSocketSuccess => {
    return {
        type: INIT_SOCKET_SUCCESS,
        socket
    };
};

const dispatchInitSocketFailure = (error: any): InitWebSocketError => {
    return {
        type: INIT_SOCKET_FAILURE,
        socket: undefined,
    };
};

const dispatchCloseSocket = (socket: WebSocket): CloseWebSocket => {
    return {
        type: CLOSE_SOCKET,
        socket: socket.close()
    };
}

export const initiateSocket = async (dispatch) => {
    try {
        const ws = await dispatch(dispatchInitSocket()).socket;
        return dispatch(dispatchInitSocketSuccess(ws));
    } catch(error) {
        dispatch(dispatchInitSocketFailure(error));
    }
};

export const closeSocket = async (dispatch, socket: WebSocket) => {
    dispatch(dispatchCloseSocket(socket));
}
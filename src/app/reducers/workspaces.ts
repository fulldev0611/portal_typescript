import _ from 'lodash';
import { Workspace } from 'types';
import {
    GET_WORKSPACES, 
    GET_WORKSPACES_SUCCESS, 
    GET_WORKSPACES_FAILURE,
    DELETE_WORKSPACE,
    DELETE_WORKSPACE_SUCCESS,
    DELETE_WORKSPACE_FAILURE,
    CREATE_WORKSPACE,
    CREATE_WORKSPACE_SUCCESS,
    CREATE_WORKSPACE_FAILURE,
    UPDATE_WORKSPACE_STATUS,
    EDIT_WORKSPACE,
    EDIT_WORKSPACE_SUCCESS,
    EDIT_WORKSPACE_FAILURE,
    OPEN_WORKSPACE,
    OPEN_WORKSPACE_SUCCESS,
    OPEN_WORKSPACE_FAILURE,
    GET_WORKSPACES_STATUS,
    GET_WORKSPACES_STATUS_SUCCESS,
    GET_WORKSPACES_STATUS_FAILURE,
} from '../actions/workspaces';

type OpenWorkspaceResponse = {
    message?: string,
    status: string,
    workspace: Workspace
}

type CreateState = {
    loading: boolean,
    error: boolean,
    response: Workspace
}

type EditState = { 
    loading: boolean,
    error: boolean,
    response: Workspace
}

type DeleteState = {
    loading: boolean,
    error: boolean,
    response: DeleteWorkspaceResponse
}

type OpenState = {
    loading: boolean,
    error: boolean,
    response: OpenWorkspaceResponse
}

type StatusState = {
    loading: boolean,
    error: boolean,
    response: WorkspaceStatusResponse
}

type WorkspaceState = {
    loading: boolean,
    queried: boolean,
    error: boolean,
    workspaces: Workspace[],
    create: CreateState,
    edit: EditState,
    _delete: DeleteState,
    open: OpenState,
    statusCheck: StatusState
}

type WorkspaceStatusResponse = {
    workspaces: Workspace[]
}

type DeleteWorkspaceResponse = {
    id: string,
    status: string
}

const initOpenState: OpenState = {
    loading: false,
    error: false,
    response: <OpenWorkspaceResponse>{}
}

const initEditState: EditState = {
    loading: false,
    error: false,
    response: <Workspace>{}
}

const initDeleteState: DeleteState = {
    loading: false,
    error: false,
    response: <DeleteWorkspaceResponse>{}
}

const initCreateState: CreateState = {
    loading: false,
    error: false,
    response: <Workspace>{}
}

const initStatusCheck: StatusState = {
    loading: false,
    error: false,
    response: <WorkspaceStatusResponse>{}
}

const INITIAL_STATE: WorkspaceState = {
    loading: false,
    queried: false,
    error: false,
    workspaces: [],
    create: initCreateState,
    edit: initEditState,
    _delete: initDeleteState,
    open: initOpenState,
    statusCheck: initStatusCheck,
};

export const workspacesReducer = (state: WorkspaceState = INITIAL_STATE, action): WorkspaceState => {
    switch(action.type) {
        case GET_WORKSPACES:
            return {
                ...state,
                loading: true,
                queried: true
            };
        case GET_WORKSPACES_SUCCESS:
            return { 
                ...state,
                loading: false,
                error: false,
                workspaces: action.payload.workspaces,
            };
        case GET_WORKSPACES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case UPDATE_WORKSPACE_STATUS:
            return { 
                ...state,
                workspaces: state.workspaces.map((workspace) => 
                    workspace.id === action.workspaceId
                    ? Object.assign({}, { ...workspace, status: action.status })
                    : Object.assign({}, workspace)
                ) as unknown as Workspace[], // TODO: THERE HAS TO BE A BETTER WAY...
            }
        case DELETE_WORKSPACE:
            return {
                ...state,
                _delete: {
                    loading: true,
                    error: false,
                    response: <DeleteWorkspaceResponse>{}
                },
            };
        case DELETE_WORKSPACE_SUCCESS:
            const deletedId = action.payload.id;
            return {
                ...state,
                workspaces: [...state.workspaces.filter(w => w.id !== deletedId)],
                _delete: {
                    loading: false,
                    error: false,
                    response: action.payload,
                }
            };
        case DELETE_WORKSPACE_FAILURE:
            return {
                ...state,
                _delete: {
                    loading: false,
                    error: true,
                    response: action.payload,
                }
            };
        case EDIT_WORKSPACE:
            return {
                ...state,
                edit: {
                    loading: true,
                    error: false,
                    response: <Workspace>{}
                },
            };
        case EDIT_WORKSPACE_SUCCESS:
            const updatedId: string = action.payload.id;
            const updatedPayload: Workspace = action.payload;
            return {
                ...state,
                workspaces: [...state.workspaces.map((w) => w.id === updatedId ? Object.assign(w, updatedPayload) : Object.assign({}, w))],
                edit: {
                    loading: false,
                    error: false,
                    response: action.payload
                },
            };
        case EDIT_WORKSPACE_FAILURE:
            return {
                ...state,
                edit: {
                    loading: false,
                    error: true,
                    response: action.payload
                },
            };
        
        case CREATE_WORKSPACE:
            return {
                ...state,
                create: {
                    loading: true,
                    error: false,
                    response: <Workspace>{}
                }
            };
        case CREATE_WORKSPACE_SUCCESS:
            return {
                ...state,
                workspaces: [action.payload.workspace, ...state.workspaces],
                create: {
                    loading: false,
                    error: false,
                    response: action.payload
                }
            }
        case CREATE_WORKSPACE_FAILURE:
            return {
                ...state,
                create: {
                    loading: false,
                    error: true,
                    response: action.payload
                }
            }
        case OPEN_WORKSPACE:
            return {
                ...state,
                open: {
                    loading: true,
                    error: false,
                    response: <OpenWorkspaceResponse>{}
                }
            }
        case OPEN_WORKSPACE_SUCCESS:
            return {
                ...state,
                open: {
                    loading: false,
                    error: false,
                    response: action.payload
                }
            }
        case OPEN_WORKSPACE_FAILURE:
            return {
                ...state,
                open: {
                    loading: false,
                    error: true,
                    response: action.payload
                }
            }
        case GET_WORKSPACES_STATUS:
            return {
                ...state,
                statusCheck: {
                    loading: true,
                    error: false,
                    response: <WorkspaceStatusResponse>{}
                }

            }
        case GET_WORKSPACES_STATUS_SUCCESS:
            return {
                ...state,
                workspaces: _.isEqual(action.payload.workspaces, state.workspaces) ? state.workspaces : action.payload.workspaces,
                statusCheck: {
                    loading: false,
                    error: false,
                    response: action.payload
                }

            }
        case GET_WORKSPACES_STATUS_FAILURE:
            return {
                ...state,
                statusCheck: {
                    loading: false,
                    error: true,
                    response: action.payload
                }

            }
        default:
            return state;
    }
};

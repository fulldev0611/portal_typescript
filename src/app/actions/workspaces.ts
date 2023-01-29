import { AxiosResponse } from 'axios';
import { Workspace } from '../../types'
import { WORKSPACES } from '../../config/endpoints';
import { apiClient } from '../../middleware/apiClient';
import { 
    CreateWorkspace,
    CreateWorkspaceError,
    CreateWorkspaceSuccess,
    DeleteWorkspace,
    DeleteWorkspaceFailure,
    DeleteWorkspaceSuccess,
    EditWorkspace,
    EditWorkspaceFailure,
    EditWorkspaceSuccess,
    GetWorkspaceError,
    GetWorkspaces,
    GetWorkspacesSuccess, 
    WorkspacesStatus,
    WorkspacesStatusError,
    WorkspacesStatusSuccess
} from 'types/actions';

export const GET_WORKSPACES = 'GET_WORKSPACES';
export const GET_WORKSPACES_SUCCESS = 'GET_WORKSPACE_SUCCESS';
export const GET_WORKSPACES_FAILURE = 'GET_WORKSPACE_FAILURE';

export const GET_WORKSPACES_STATUS = 'GET_WORKSPACES_STATUS';
export const GET_WORKSPACES_STATUS_SUCCESS = 'GET_WORKSPACES_STATUS_SUCCESS';
export const GET_WORKSPACES_STATUS_FAILURE = 'GET_WORKSPACES_STATUS_FAILURE';

export const DELETE_WORKSPACE = 'DELETE_WORKSPACE';
export const DELETE_WORKSPACE_SUCCESS = 'DELETE_WORKSPACE_SUCCESS';
export const DELETE_WORKSPACE_FAILURE = 'DELETE_WORKSPACE_FAILURE';

export const CREATE_WORKSPACE = 'CREATE_WORKSPACE';
export const CREATE_WORKSPACE_SUCCESS = 'CREATE_WORKSPACE_SUCCESS';
export const CREATE_WORKSPACE_FAILURE = 'CREATE_WORKSPACE_FAILURE';

export const EDIT_WORKSPACE = 'EDIT_WORKSPACE';
export const EDIT_WORKSPACE_SUCCESS = 'EDIT_WORKSPACE_SUCCESS';
export const EDIT_WORKSPACE_FAILURE = 'EDIT_WORKSPACE_FAILURE';

export const OPEN_WORKSPACE = 'OPEN_WORKSPACE';
export const OPEN_WORKSPACE_SUCCESS = 'OPEN_WORKSPACE_SUCCESS';
export const OPEN_WORKSPACE_FAILURE = 'OPEN_WORKSPACE_FAILURE';

export const UPDATE_WORKSPACE_STATUS = 'UPDATE_WORKSPACE_STATUS';

const api = apiClient();

const dispatchGetWorkspaces = (): GetWorkspaces => {
    return {
        type: GET_WORKSPACES,
        payload: api.get(WORKSPACES.GET_ALL_WORKSPACES),
    };
};

const dispatchGetWorkspacesFailure = (error: any): GetWorkspaceError => {
    return {
        type: GET_WORKSPACES_FAILURE,
        payload: error,
    };
};

const dispatchGetWorkspacesSuccess = (response: AxiosResponse): GetWorkspacesSuccess => {
    return {
        type: GET_WORKSPACES_SUCCESS,
        payload: response.data as Workspace[],
    };
};

const dispatchDeleteWorkspace = (workspaceId: string): DeleteWorkspace => {
    return {
        type: DELETE_WORKSPACE,
        payload: api._delete(WORKSPACES.DELETE_WORKSPACE(workspaceId))
    };
};

const dispatchDeleteWorkspaceSuccess = (response: AxiosResponse): DeleteWorkspaceSuccess => {
    return {
        type: DELETE_WORKSPACE_SUCCESS,
        payload: response.data,
    };
};

const dispatchDeleteWorkspaceFailure = (error: any): DeleteWorkspaceFailure => {
    return {
        type: DELETE_WORKSPACE_FAILURE,
        payload: error,
    };
};

const dispatchEditWorkspace = (workspaceId: string, payload): EditWorkspace => {
    return {
        type: EDIT_WORKSPACE,
        payload: api.put(WORKSPACES.EDIT_WORKSPACE(workspaceId), { payload })
    };
};

const dispatchEditWorkspaceSuccess = (response: AxiosResponse): EditWorkspaceSuccess => {
    return {
        type: EDIT_WORKSPACE_SUCCESS,
        payload: response.data,
    };
};

const dispatchEditWorkspaceFailure = (error: any): EditWorkspaceFailure => {
    return {
        type: EDIT_WORKSPACE_FAILURE,
        payload: error,
    };
};

const dispatchCreateWorkspace = (templateId: string, name: string, description: string): CreateWorkspace => {
    const payload = {
        templateId,
        name,
        description,
    };
    
    return {
        type: CREATE_WORKSPACE,
        payload: api.post(WORKSPACES.CREATE_WORKSPACE, { payload }),
    };
};

const dispatchCreateWorkspaceSuccess = (response: AxiosResponse): CreateWorkspaceSuccess => {
    return {
        type: CREATE_WORKSPACE_SUCCESS,
        payload: response.data as Workspace,
    };
};

const dispatchCreateWorkspaceFailure = (error: any): CreateWorkspaceError => {
    return {
        type: CREATE_WORKSPACE_FAILURE,
        payload: error,
    };
};

const dispatchOpenWorkspace = (workspaceId: string): CreateWorkspace => {
    
    return {
        type: OPEN_WORKSPACE,
        payload: api.get(WORKSPACES.OPEN_WORKSPACE(workspaceId)),
    };
};

const dispatchOpenWorkspaceSuccess = (response: AxiosResponse): CreateWorkspaceSuccess => {
    return {
        type: OPEN_WORKSPACE_SUCCESS,
        payload: response.data as Workspace,
    };
};

const dispatchOpenWorkspaceFailure = (error: any): CreateWorkspaceError => {
    return {
        type: OPEN_WORKSPACE_FAILURE,
        payload: error,
    };
};


export const getWorkspaces = async (dispatch) => {
    try {
        const response = await dispatch(dispatchGetWorkspaces()).payload;
        return dispatch(dispatchGetWorkspacesSuccess(response));
    } catch(error) {
        dispatch(dispatchGetWorkspacesFailure(error));
    }
};

export const deleteWorkspace = async (dispatch, workspsaceId: string) => {
    try {
        const response = await dispatch(dispatchDeleteWorkspace(workspsaceId)).payload;
        return dispatch(dispatchDeleteWorkspaceSuccess(response));
    } catch (error) {
        dispatch(dispatchDeleteWorkspaceFailure(error));
    }
};

export const createWorkspace = async (dispatch, templateId: string, { name, description }) => {
    try {
        const response = await dispatch(dispatchCreateWorkspace(templateId, name, description)).payload;
        return dispatch(dispatchCreateWorkspaceSuccess(response));
    } catch (error) {
        dispatch(dispatchCreateWorkspaceFailure(error));
    }
}

export const updateWorkspaceStatus = async (dispatch, status: string, workspaceId: string) => {
    dispatch({
        type: UPDATE_WORKSPACE_STATUS,
        status,
        workspaceId
    })
}

export const editWorkspace = async (dispatch, workspaceId, fields) => {
    try {
        const response = await dispatch(dispatchEditWorkspace(workspaceId, fields)).payload;
        console.log(response);
        return dispatch(dispatchEditWorkspaceSuccess(response));
    } catch (err) {
        console.log(err);
        dispatch(dispatchEditWorkspaceFailure(err));
    }
}

export const openWorkspace = async (dispatch, workspaceId: string) => {
    try {
        const response = await dispatch(dispatchOpenWorkspace(workspaceId)).payload;
        return dispatch(dispatchOpenWorkspaceSuccess(response));
    } catch (error) {
        dispatch(dispatchOpenWorkspaceFailure(error));
    }
}


const dispatchGetWorkspaceStatuses = (): WorkspacesStatus => {
    
    return {
        type: GET_WORKSPACES_STATUS,
        payload: api.get(WORKSPACES.GET_ALL_WORKSPACES),
    };
};

const dispatchGetWorkspaceStatusesSuccess = (response: AxiosResponse): WorkspacesStatusSuccess => {
    return {
        type: GET_WORKSPACES_STATUS_SUCCESS,
        payload: response.data,
    };
};

const dispatchGetWorkspaceStatusesFailure = (error: any): WorkspacesStatusError => {
    return {
        type: GET_WORKSPACES_STATUS_FAILURE,
        payload: error,
    };
};

export const getWorkspaceStatus = async (dispatch) => {
    try {
        const response = await dispatch(dispatchGetWorkspaceStatuses()).payload;
        return dispatch(dispatchGetWorkspaceStatusesSuccess(response));
    } catch(error) {
        dispatch(dispatchGetWorkspaceStatusesFailure(error));
    }
}
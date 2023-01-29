import { AxiosResponse } from "axios";
import { DeleteWorkspaceResponse, ErrorResponse, Template, Workspace } from "types";

export type ActionResponse = {
    type: string,
    payload: Promise<AxiosResponse> | any
}

export type GetWorkspaces = {
    type: string,
    payload: Promise<AxiosResponse>,
};

export type GetWorkspacesSuccess = {
    type: string,
    payload: Workspace[],
};

export type GetWorkspaceError = {
    type: string,
    payload: ErrorResponse
};

export type DeleteWorkspace = {
    type: string,
    payload: Promise<AxiosResponse>,
};

export type DeleteWorkspaceSuccess = {
    type: string,
    payload: DeleteWorkspaceResponse,
};

export type DeleteWorkspaceFailure = {
    type: string,
    payload: ErrorResponse,
};

export type EditWorkspace = {
    type: string,
    payload: Promise<AxiosResponse>,
};

export type EditWorkspaceSuccess = {
    type: string,
    payload: Workspace,
};

export type EditWorkspaceFailure = {
    type: string,
    payload: ErrorResponse,
};

export type GetTemplates = {
    type: string,
    payload: Promise<AxiosResponse>,
};

export type GetTemplatesSuccess = {
    type: string,
    payload: Template[],
};

export type GetTemplatesError = {
    type: string,
    payload: ErrorResponse
};

export type InitWebSocket = {
    type: string,
    socket: Promise<WebSocket>
}

export type InitWebSocketSuccess = {
    type: string,
    socket: WebSocket
}

export type InitWebSocketError = {
    type: string,
    socket: undefined
}

export type CloseWebSocket = {
    type: string,
    socket: void
}

export type CreateWorkspaceSuccess = {
    type: string,
    payload: Workspace
}

export type CreateWorkspace = {
    type: string,
    payload: Promise<AxiosResponse>
}

export type CreateWorkspaceError = {
    type: string,
    payload: ErrorResponse
}

export type WorkspacesStatus = {
    type: string,
    payload: Promise<AxiosResponse>
}

export type WorkspacesStatusSuccess = {
    type: string,
    payload: { workspaces: Workspace[] }
}

export type WorkspacesStatusError = {
    type: string,
    payload: ErrorResponse
}
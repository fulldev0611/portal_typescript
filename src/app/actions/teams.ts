import { AxiosResponse } from "axios";
import { apiClient } from "middleware/apiClient";
import { TEAMS } from "config/endpoints";
import { ActionResponse } from "types/actions";

export const GET_TEAMS = 'GET_TEAMS';
export const GET_TEAMS_SUCCESS = 'GET_TEAMS_SUCCESS';
export const GET_TEAMS_FAILURE = 'GET_TEAMS_FAILURE';


const api = apiClient();

const dispatchGetTeams = (): ActionResponse => {
    return {
        type: GET_TEAMS,
        payload: api.get(TEAMS.GET_TEAMS),
    };
};

const dispatchGetTeamsSuccess = (response: AxiosResponse): ActionResponse => {
    return {
        type: GET_TEAMS_SUCCESS,
        payload: response.data,
    };
};

const dispatchGetTeamsFailure = (error: any): ActionResponse => {
    return {
        type: GET_TEAMS_FAILURE,
        payload: error,
    };
};

export const getTeams = async (dispatch) => {
    try { 
        const response = await dispatch(dispatchGetTeams()).payload;
        return dispatch(dispatchGetTeamsSuccess(response));
    } catch (error) {
        dispatch(dispatchGetTeamsFailure(error));
    }
};
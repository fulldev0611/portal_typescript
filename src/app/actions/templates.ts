import { AxiosResponse } from 'axios';
import { TEMPLATES } from '../../config/endpoints';
import { apiClient } from '../../middleware/apiClient';
import { 
    GetTemplates,
    GetTemplatesError,
    GetTemplatesSuccess,
} from 'types/actions';
import { Template } from 'types';

export const GET_TEMPLATES = 'GET_TEMPLATES';
export const GET_TEMPLATES_SUCCESS = 'GET_TEMPLATES_SUCCESS';
export const GET_TEMPLATES_FAILURE = 'GET_TEMPLATES_FAILURE';

const api = apiClient();

const dispatchGetTemplates = (): GetTemplates => {
    return {
        type: GET_TEMPLATES,
        payload: api.get(TEMPLATES.GET_TEMPLATES),
    };
};

const dispatchGetTemplatesSuccess = (response: AxiosResponse): GetTemplatesSuccess => {
    return {
        type: GET_TEMPLATES_SUCCESS,
        payload: response.data as Template[],
    };
};

const dispatchGetTemplatesFailure = (error: any): GetTemplatesError => {
    return {
        type: GET_TEMPLATES_FAILURE,
        payload: error,
    };
};

export const getTemplates = async (dispatch) => {
    try {
        const response = await dispatch(dispatchGetTemplates()).payload;
        return dispatch(dispatchGetTemplatesSuccess(response));
    } catch(error) {
        dispatch(dispatchGetTemplatesFailure(error));
    }
};
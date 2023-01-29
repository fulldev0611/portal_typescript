import _ from 'lodash';
import { Template } from 'types';
import {
    GET_TEMPLATES,
    GET_TEMPLATES_SUCCESS,
    GET_TEMPLATES_FAILURE
} from '../actions/templates';

const INITIAL_STATE = { loading: false, queried: false, templates: [] as Template[], pages: [[] as Template[]] };


export const templatesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) { 
        case GET_TEMPLATES:
            return { ...state, loading: true, queried: true };
        case GET_TEMPLATES_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: false, 
                templates: action.payload.templates as Template[],
                pages: _.chunk(action.payload.templates as Template[], 5),
            };
        case GET_TEMPLATES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

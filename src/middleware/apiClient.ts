import axios, { AxiosResponse } from 'axios';
import { configSelector } from 'config';
import keycloak from '../app/keycloak';

const config = configSelector(process.env.NODE_ENV);

console.log(process.env.NODE_ENV);

const bases = config.api;

const getBase = (resource: string) => {
    if (resource.indexOf('/workspaces') !== -1 || resource.indexOf('/templates') !== -1) return bases.workspace;

    if (
        resource.indexOf('/users') !== -1
        || resource.indexOf('/account') !== -1
        || resource.indexOf('/integrations') !== -1
        || resource.indexOf('/notifications') !== -1
        || resource.indexOf('/teams') !== -1
    ) return bases.account;

    if(resource.indexOf('/plans') !== -1
        || resource.indexOf('/payments') !== -1
    ) return bases.submgr;

    return '';
};

const getAuthTokenHeader = () => {
    return {
        Authorization: `Bearer ${keycloak.token}`,
    };
};

const buildHeaders = (addHeaders = {}) => {
    return {
        ...getAuthTokenHeader(),
        ...addHeaders,
    };
};

export const apiClient = () => {
    const get = async (resource: string, addHeaders = {}): Promise<AxiosResponse> => {
        const base = getBase(resource);
        const headers = buildHeaders(addHeaders);
        return await axios.get(`${base}${resource}`, {headers} );
    };
    const post = async (resource: string, {payload = {}, addHeaders = {}}): Promise<AxiosResponse> => {
        const base = getBase(resource);
        const headers = buildHeaders(addHeaders);
        return await axios.post(`${base}${resource}`, payload, {headers});
    };
    const put = async (resource: string, {payload = {}, addHeaders = {}}): Promise<AxiosResponse> => {
        const base = getBase(resource);
        const headers = buildHeaders(addHeaders);
        return await axios.put(`${base}${resource}`, payload, {headers});
    };

    const _delete = async (resource: string, addHeaders = {}): Promise<AxiosResponse> => {
        const base = getBase(resource);
        const headers = buildHeaders(addHeaders);
        return await axios.delete(`${base}${resource}`, {headers});
    };

   
    return {
        get,
        post,
        put,
        _delete,
     
    };
};
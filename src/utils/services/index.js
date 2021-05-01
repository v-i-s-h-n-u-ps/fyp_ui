import axios from "axios";
import { get as _get } from "lodash";

import { config } from "@config";

export const api = function (timeout = 10000, baseURL = config.apiUrl) {
    return axios.create({
        baseURL: baseURL,
        timeout: timeout,
        validateStatus: status => { return (status >= 200 && status < 500) }
    });
};

const GET = async (url, params = {}) => {
    const response = await api().get(url, { params });
    return response;
};

const POST = async (url, data, timeout) => {
    const response = await api(timeout).post(url, data);
    return response;
};

export const signup = data => POST('user/signup/', data);
export const login = data => POST('user/login/', data);
export const me = () => GET('user/me');
export const refresh = data => POST('user/refresh/', data);
export const logout = data => POST('user/revoke/', data);
export const activate = data => POST('user/activate', data);
export const passwordResetRequest = data => GET('user/password-reset-request', data);
export const passwordReset = data => POST('user/password-reset', data);
export const passwordChange = data => POST('user/password-change', data);

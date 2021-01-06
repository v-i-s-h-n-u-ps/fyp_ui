import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { tokenKey } from "../constants"
import { config } from "../../config";
import {
    api,
} from "../../utils/services";


export const SET_AUTH = data => {
    const { token } = data
    cookie.set(tokenKey, token, { domain: config["domain"] || "" });
};

export const REMOVE_AUTH = () => {
    cookie.remove(tokenKey, { domain: config["domain"] || "" });
    delete api().defaults.headers.common["Authorization"];
    delete api().defaults.headers["Authorization"];
}

export const GET_AUTH = (props) => {
    const { isServer = false, ctx = null } = props
    let token;
    if (isServer) {
        const { tk } = nextCookie(ctx);
        return tk
    } else {
        const token = cookie.get(tokenKey);
        if (token) {
            return token
        }
        return null
    }
}
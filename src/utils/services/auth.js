import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { tokenKey } from "../constants"
import { config } from "../../config";
import {
    api,
} from "../../utils/services";


export const SET_AUTH = data => {
    const tokens = JSON.stringify(data);
    api().defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
    api().defaults.headers["Authorization"] = `Bearer ${data.access_token}`;
    cookie.set(tokenKey, tokens, { domain: config["domain"] || "" });
};

export const REMOVE_AUTH = () => {
    cookie.remove(tokenKey, { domain: config["domain"] || "" });
    delete api().defaults.headers.common["Authorization"];
    delete api().defaults.headers["Authorization"];
}

export const GET_AUTH = (props) => {
    const { isServer = false, ctx = null } = props
    if (isServer) {
        const { tk } = nextCookie(ctx);
        return tk;
    } else {
        const token = JSON.parse(cookie.get(tokenKey) || "");
        if (token) {
            return token
        }
        return null
    }
}

export const authHeaders = () => {
    const auth = GET_AUTH({})
    if (auth.access_token) return {
        "Authorization": `Bearer ${auth.access_token}`,
        common: {
            "Authorization": `Bearer ${auth.access_token}`
        }
    }
    return false;
}

import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import axios from "axios";

import { tokenKey } from "@constants"
import { config } from "@config";

export const SET_AUTH = data => {
    if (!data) return;
    const tokens = JSON.stringify(data);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
    axios.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;
    cookie.set(tokenKey, tokens, { domain: config["domain"] || "" });
};

export const REMOVE_AUTH = () => {
    cookie.remove(tokenKey, { domain: config["domain"] || "" });
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers["Authorization"];
}

export const GET_AUTH = (props) => {
    const { isServer = false, ctx = null } = props
    if (isServer) {
        const { tk } = nextCookie(ctx);
        return tk || {};
    } else {
        const token = cookie.get(tokenKey);
        if (token) {
            return JSON.parse(token)
        }
        return null
    }
}

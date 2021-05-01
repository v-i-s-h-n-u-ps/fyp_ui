import cookie from 'js-cookie'
import { THEME, LOCALE } from "../constants";
import { config } from "@config";

export const SET_THEME = theme => cookie.set(THEME, theme, { domain: config["domain"] || "" });
export const GET_THEME = () => cookie.get(THEME);
export const SET_LOCALE = locale => cookie.set(LOCALE, locale, { domain: config["domain"] || "" });
export const GET_LOCALE = () => cookie.get(LOCALE);
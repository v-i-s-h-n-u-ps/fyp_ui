import { action, FAILURE, REQUEST, SUCCESS, UNSET, SET } from "../actionCreator";
import {
    SET_NEW_CHAT_USER
} from "./types";

export const newChat = {
    set: data => action(SET_NEW_CHAT_USER[SET], ({ data })),
    unset: () => action(SET_NEW_CHAT_USER[UNSET]),
}
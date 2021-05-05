import { action, FAILURE, REQUEST, SUCCESS } from "../actionCreator";
import {
    UNIVERSITY, ROLE, CATEGORY, TYPE
} from "./types";

export const university = {
    request: data => action(UNIVERSITY[REQUEST], { data }),
    success: (data, response) => action(UNIVERSITY[SUCCESS], { data, response }),
    failure: (data, error) => action(UNIVERSITY[FAILURE], { data, error }),
};

export const role = {
    request: data => action(ROLE[REQUEST], { data }),
    success: (data, response) => action(ROLE[SUCCESS], { data, response }),
    failure: (data, error) => action(ROLE[FAILURE], { data, error }),
};

export const category = {
    request: data => action(CATEGORY[REQUEST], { data }),
    success: (data, response) => action(CATEGORY[SUCCESS], { data, response }),
    failure: (data, error) => action(CATEGORY[FAILURE], { data, error }),
};

export const type = {
    request: data => action(TYPE[REQUEST], { data }),
    success: (data, response) => action(TYPE[SUCCESS], { data, response }),
    failure: (data, error) => action(TYPE[FAILURE], { data, error }),
}

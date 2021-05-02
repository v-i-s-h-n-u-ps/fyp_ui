import { FAILURE } from "@redux/actionCreator";
import { LOGIN, SIGNUP, ACTIVATE } from "@redux/user/types";

const GLOBAL_API_FAILURE_CONFIG = [
    ACTIVATE[FAILURE],
    SIGNUP[FAILURE],
    LOGIN[FAILURE],
];

export default GLOBAL_API_FAILURE_CONFIG;
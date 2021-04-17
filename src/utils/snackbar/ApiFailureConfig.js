import { FAILURE } from "../../redux/actionCreator";
import { FETCH_AUTH_USER_INFO, LOGIN, REGISTER, SEND_OTP, VERIFY_OTP } from "../../redux/user/types";

const GLOBAL_API_FAILURE_CONFIG = [
    SEND_OTP[FAILURE],
    VERIFY_OTP[FAILURE],
    FETCH_AUTH_USER_INFO[FAILURE],
    REGISTER[FAILURE],
    LOGIN[FAILURE],
];

export default GLOBAL_API_FAILURE_CONFIG;
import { FAILURE } from "../../redux/actionCreator";
import { LOGIN, SIGNUP, VERIFY_OTP } from "../../redux/user/types";

const GLOBAL_API_FAILURE_CONFIG = [
    VERIFY_OTP[FAILURE],
    SIGNUP[FAILURE],
    LOGIN[FAILURE],
];

export default GLOBAL_API_FAILURE_CONFIG;
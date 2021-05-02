import { SUCCESS } from "../../redux/actionCreator";
import {
    PASSWORD_RESET_REQUEST, PASSWORD_RESET
} from "../../redux/user/types"

const GLOBAL_API_SUCCESS_CONFIG = [
    PASSWORD_RESET_REQUEST[SUCCESS],
    PASSWORD_RESET[SUCCESS]
];

export default GLOBAL_API_SUCCESS_CONFIG;
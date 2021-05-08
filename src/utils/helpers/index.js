import _get from "lodash/get";
import router from "next/router";

export const leadingZero = value => {
    if(typeof value !== 'number') return value;
    else if(value < 0) return value;
    else return value < 10 ? `0${value}` : value;
}

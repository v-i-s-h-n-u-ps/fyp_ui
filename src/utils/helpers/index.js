import _get from "lodash/get";
import router from "next/router";

export const leadingZero = value => {
    if(typeof value !== 'number') return value;
    else if(value < 0) return value;
    else return value < 10 ? `0${value}` : value;
}

export const removeFromMultiList = (list, itemToRemove, key) => {
    if (typeof itemToRemove === 'undefined') return list;
    if (typeof itemToRemove === 'object') {
        const newList = list.filter(item => item !== itemToRemove[key])
        return newList;
    } else if (Number.isInteger(itemToRemove)) {
        const newList = list.splice(itemToRemove, 1)
        return newList
    }
}

import React from "react";
import { get as _get } from "lodash";

export const trimNestedObject = values =>
    Object.keys(values).reduce((res, key) => {
        if (values[key] === undefined) {
            res[key] = null;
        } else if (values[key] !== null && typeof values[key] === "string") {
            if (values[key] === "") res[key] = null;
            else res[key] = (values[key] || "").trim();
        } else if (values[key] !== null && typeof values[key] === "object") {
            res[key] = trimNestedObject(values[key]);
        } else res[key] = values[key];
        return res;
    }, {});

export const validateNullInput = (...args) => {
    return (
        args.filter(val => {
            return val && val.toString().trim().length;
        }).length === args.length
    );
};

export const getDialCodeFromSelectUnique = val => {
    if (!val) {
        return val;
    }
    val = val.split("_");
    val = val[0];
    return val;
};

const CUSTOM_TRIGGER_PARAMS = ["US", "+1_US", "+1"];
export const formatMobileNumber = val => {
    return val ? val.toString().replace(/[^\d]/g, "") : val;
};

export const formatCountryMobile = (mob, code = "") => {
    if (!mob.trim().length) return mob.trim();
    let phone = formatMobileNumber(mob);
    if (CUSTOM_TRIGGER_PARAMS.includes(code) && phone.length > 3) {
        const match = phone.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
        if (match) {
            phone = `(${match[1]})${match[2] ? " " : ""}${match[2]}${match[3] ? "-" : ""
                }${match[3]}`;
        }
    }
    return phone.trim();
};

export const getDialAndCountryCode = val => {
    val = val.split("_");
    const dialCode = val.length ? val[0] : "";
    const countryCode = val.length > 1 ? val[1] : "";
    return { dialCode, countryCode };
};

export const showFormikErrorCommunity = (props, val, successMsg = null) => {
    const error = _get(props, `errors.${val}`)
    const touched = _get(props, `touched.${val}`)
    return touched && error ?
        (error && <p datatype={"error"}>{error}</p>) :
        (touched && <p datatype={"success"}>{successMsg}</p>)
}

export const processFileInputs = (files) => {
    const filePayload = new FormData();
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        filePayload.append("files[" + i + "]", file);
    }
    return filePayload;
};

let _uniqKey = 0;
export const uniqKey = (prefix = "key") => {
    _uniqKey++;
    return `${prefix}_${_uniqKey}`;
}
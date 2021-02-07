import React from "react";

import s from "./index.module.scss";
import ActivityIndicator from "../../Loader/ActivityIndicator";

// include values: primary, secondary, cancel, delete, message

const Button = props => {

    const { 
        text, disabled = false, onClick, loading = false, type="primary", variant="block" 
    } = props;

    return (
        <button
            disabled={disabled || loading}
            onClick={onClick}
            className={`${s.button} ${s[type]} ${s[variant]}`}
        >
            {loading
                ? <ActivityIndicator show={loading} color="#ffffff" />
                : text
            }
        </button>
    )
}

export default Button;
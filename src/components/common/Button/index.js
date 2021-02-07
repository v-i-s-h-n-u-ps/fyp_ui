import React from "react";

import s from "./index.module.scss";
import ActivityIndicator from "../../Loader/ActivityIndicator";

// include values: primary, secondary, cancel, cautious

const IndicatorMap = (type, variant) => {
    if (variant === 'block') {
        return "#ffffff";
    } else {
        switch (type) {
            case "primary": return "#0097e6";
            case "secondary": return "#50a354";
            case "cancel": return "#cf5248";
            case "cautious": return "#eb1926";
            case "message": return "#8e4d99";
            case "whatsapp": return "#075e54";
            default: return "#0097e6";
        }
    }
}

const Button = props => {

    const {
        text, disabled = false,
        onClick, loading = false,
        type = "primary", variant = "block",
        width = 30, icon, iconStyle
    } = props;

    const color = IndicatorMap(type, variant)

    return (
        <>
            <button
                disabled={disabled || loading}
                onClick={onClick}
                className={`${s.button} ${s[type]} ${s[variant]} button`}
            >
                <span>
                    {loading
                        ? <ActivityIndicator show={loading} color={color} />
                        : <p className={`${s.text} ${!!icon ? s.withIcon : ''}`}>
                            {text} {icon && <i className={`icon-${icon} ${iconStyle}`} />}
                        </p>
                    }
                </span>
            </button>
            <style jsx>{`
                .button {
                    width: ${width}%
                }
            `}</style>
        </>
    )
}

export default Button;
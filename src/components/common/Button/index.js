import React from "react";

import s from "./index.module.scss";
import ActivityIndicator from "../../loader/ActivityIndicator";
import Ripple from "../../_hoc/Ripple";

// include values: primary, secondary, cancel, cautious, message, whatsapp

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
        text, icon, onClick, loading = false,
        type = "primary", variant = "block",
        width = 100, rippleDuration = 1000,
        ripple = true, rippleClass = '',
        iconColor = '', disabled = false,
    } = props;

    const color = IndicatorMap(type, variant);

    return (
        <div className={`button`}>
            <button
                disabled={disabled || loading}
                onClick={onClick}
                className={`${s.button} ${s[type]} ${s[variant]}`}
            >
                <Ripple
                    className={rippleClass}
                    disabled={disabled || loading || !ripple}
                    duration={rippleDuration}
                >
                    <div className={s.container}>
                        {loading
                            ? <ActivityIndicator show={loading} color={color} />
                            : <p className={`${s.text} ${!!icon ? s.withIcon : ''}`}>
                                {text} {icon && <i className={`icon-${icon} ${s.iconStyle} iconColor`} />}
                            </p>
                        }
                    </div>
                </Ripple>
            </button>
            <style jsx>{`
                .iconColor {
                    color: ${iconColor}
                }
                .button {
                    border-radius: 8px;
                    margin: 3px;
                }
                @media screen and (min-width: 640px) {
                    .button {
                        width: ${width}%;
                    }
                }
                @media screen and (max-width: 640px) {
                    .button {
                        width: calc(${width}% - 16px);
                        margin: 3px auto;
                    }
                }
            `}</style>
        </div>
    )
}

export default Button;
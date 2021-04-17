import React, { useState, useEffect } from "react";

import s from "./index.module.scss";

const Ripple = ({
    duration = 1000,
    color = "#eeeeee",
    borderRadius = '8px',
    className = '',
    disabled = false,
    children,
    callback
}) => {

    const [ripples, setRipples] = useState([]);

    const addRipple = e => {
        const target = e.currentTarget.getBoundingClientRect();
        const size = target.width > target.height ? target.width : target.height;
        const x = e.pageX - target.x - size / 2 - window.pageXOffset;
        const y = e.pageY - target.y - size / 2 - window.pageYOffset;
        const newRipple = { x, y, size };
        setRipples([...ripples, newRipple]);
    };

    useEffect(() => {
        let bounce = null;
        if (ripples.length > 0) {
            clearTimeout(bounce);
            bounce = setTimeout(() => {
                setRipples([]);
                clearTimeout(bounce);
            }, duration * 4);
        }
        return () => clearTimeout(bounce);
    }, [ripples.length, duration, setRipples]);

    return (
        <div className={`main-target ${className}`} onClick={!disabled ? callback : null}>
            {children}
            <div className={`ripple-target`} onMouseDown={!disabled ? addRipple : null}>
                {ripples.length > 0 &&
                    ripples.map((ripple, index) => {
                        return (
                            <span
                                key={`span_${index}`}
                                className={`ripple`}
                                style={{
                                    top: ripple.y,
                                    left: ripple.x,
                                    width: ripple.size,
                                    height: ripple.size
                                }}
                            />
                        );
                    })
                }
            </div>
            <style jsx>{`
                .main-target {
                    position: relative;
                    overflow: hidden;
                    border-radius: ${borderRadius};
                    cursor: pointer;
                }
                .ripple-target {
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;

                }
                .ripple {
                    transform: scale(0);
                    border-radius: 100%;
                    position: absolute;
                    opacity: 0.5;
                    background: ${color};
                    animation-name: ripple;
                    animation-duration: ${duration}ms;
                    animation-timing-function: east-in;
                }
                @keyframes ripple {
                    to {
                        opacity: 0;
                        transform: scale(2);
                    }
                }
            `}</style>
        </div>
    );
};

export default Ripple;

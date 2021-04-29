import React from "react";

import s from "./index.module.scss";

const ActivityIndicator = props => {

    const { show, strokeWidth = 4, r = 15, color = "#93bfec" } = props;

    return (
        <>
            {show &&
                <>
                    <svg 
                        className={`${s.spinner} spinner`} 
                        viewBox="0 0 50 50"
                    >
                        <circle 
                            className={`${s.path} path`} 
                            fill="none" 
                            cx="25" 
                            cy="25" 
                            r={r} 
                            strokeWidth={strokeWidth}
                        />
                    </svg>
                    <style jsx>{`
                        .spinner .path {
                            stroke: ${color};
                        }
                    `}</style>
                </>
            }
        </>
    )
}

export default ActivityIndicator;
import React from "react";

const ClientOnly = props => {
    return (
        <>
            {typeof window !== 'undefined' && <>{props.children}</>}
        </>
    );
};

export default  ClientOnly;
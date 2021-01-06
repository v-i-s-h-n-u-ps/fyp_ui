import React from 'react'
import _get from "lodash/get"
import { useRouter } from "next/router";
import { includes as _includes, isEmpty as _isEmpty } from "lodash";

const MidGuard = (props) => {
    const Router = useRouter();

    return (
        <>
            {props.children}
        </>
    )

}

export default (MidGuard)

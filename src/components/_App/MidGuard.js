import React, { useEffect } from 'react'
import _get from "lodash/get"
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { createStructuredSelector } from "reselect";

import { selectIsAuth } from "../../redux/user/selectors";
import { PUBLIC_ROUTES, PRIVATE_ROUTES, DASHBOARD, ROOT } from "../../utils/constants/routes";

const MidGuard = (props) => {
    const Router = useRouter();

    const { selectIsAuth, isServer } = props;

    // useEffect(() => {
    //     if(!selectIsAuth && PRIVATE_ROUTES.includes(Router.pathname)) {
    //         Router.push(ROOT);
    //     } else if(PUBLIC_ROUTES.includes(Router.pathname)) {
    //         Router.push(DASHBOARD);
    //     }
    // }, [Router.pathname, selectIsAuth])

    return (
        <>
            {props.children}
        </>
    )

}

const mapStateToProps = createStructuredSelector({
    selectIsAuth
})

export default connect(mapStateToProps)(MidGuard)

import React from "react";

import withReduxSaga from "../../src";
import Access from "@screens/Access";

const AccessPage = (props) => <Access {...props} />

AccessPage.getInitialProps = async (props) => {
    const { isServer } = props.ctx;
    let { req, asPath } = props.ctx;

    req = req || { headers: { host: window.location.host } };

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

export default withReduxSaga(AccessPage);
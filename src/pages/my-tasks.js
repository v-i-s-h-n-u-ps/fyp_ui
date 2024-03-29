import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from ".."
import Profile from "@screens/Profile";

const DashboardPage = (props) => <> </>

DashboardPage.getInitialProps = async (props) => {
    const { isServer } = props.ctx;
    let { req, asPath } = props.ctx;

    req = req || { headers: { host: window.location.host } };

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

export default withReduxSaga(DashboardPage);
import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "../../src";
import Access from "@screens/Access";
import { otpSend } from "@redux/user/actions";
import {
    selectIsOtpSent
} from "@redux/user/selectors";

const AccessPage = (props) => <Access {...props} />

const mapStateToProps = createStructuredSelector({
    selectIsOtpSent
})

AccessPage.getInitialProps = async (props) => {
    const { isServer, store } = props.ctx;
    let { req, asPath } = props.ctx;

    req = req || { headers: { host: window.location.host } };

    await store.dispatch(otpSend.unset());

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

export default withReduxSaga(connect(mapStateToProps)(AccessPage));
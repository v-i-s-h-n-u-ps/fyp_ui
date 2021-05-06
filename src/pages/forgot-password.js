import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "..";
import ForgotPassword from "@screens/ForgotPassword";
import { passwordReset, passwordResetRequest, resetOtpSend } from "@redux/user/actions";
import { 
    selectIsFormSubmitting, selectIsRequestSuccess
} from "@redux/user/selectors";

const ForgotPasswordPage = (props) => <ForgotPassword {...props} />

const mapStateToProps = createStructuredSelector({
    selectIsFormSubmitting,
    selectIsRequestSuccess
})

const mapDispatchToProps = dispatch => {
    return {
        d__passwordReset: data => dispatch(passwordReset.request(data)),
        d__passwordResetRequest: data => dispatch(passwordResetRequest.request(data)),
    }
}

ForgotPasswordPage.getInitialProps = async (props) => {
    const { isServer, store } = props.ctx;
    let { req, asPath } = props.ctx;

    req = req || { headers: { host: window.location.host } };

    await store.dispatch(resetOtpSend.unset());

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage));

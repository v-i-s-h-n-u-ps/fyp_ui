import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "..";
import { selectThemePreference } from "@redux/user/selectors";
import { getProjectHome } from "@redux/projects/actions";
import {
    selectHomeData, selectHomePageInfo, selectIsHomeDataLoading
} from "@redux/projects/selectors";
import {
    newChat
} from "@redux/miscellaneous/actions";
import Dashboard from "@screens/Dashboard";

const DashboardPage = props => <Dashboard {...props} />;

DashboardPage.getInitialProps = async (props) => {
    const { isServer, store } = props.ctx;
    let { req, asPath } = props.ctx;

    req = req || { headers: { host: window.location.host } };

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

const mapStateToProps = createStructuredSelector({
    selectThemePreference,
    selectHomeData, selectHomePageInfo, selectIsHomeDataLoading
})

const mapDispatchToProps = dispatch => {
    return {
        d__getProjectHome: data => dispatch(getProjectHome.request(data)),
        d__unsetProjectHome: () => dispatch(getProjectHome.unset()),
        d__newChat: data => dispatch(newChat.set(data))
    }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
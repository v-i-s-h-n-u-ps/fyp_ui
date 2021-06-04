import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "../..";
import {
    getUserProfile
} from "@redux/user/actions";
import {
    selectIsUserProfileLoading, 
    selectUserProfile,
    selectUserInfo
} from "@redux/user/selectors";
import UserProfile from "@screens/Profile/UserProfile";

const UserProfilePage = props =>  <UserProfile {...props} />

UserProfilePage.getInitialProps = async (props) => {
    const { isServer, store } = props.ctx;
    let { req, asPath, query } = props.ctx;

    req = req || { headers: { host: window.location.host } };

    await store.dispatch(getUserProfile.unset());
    await store.dispatch(getUserProfile.request({ id: query.id }));

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

const mapStateToProps = createStructuredSelector({
    selectIsUserProfileLoading, 
    selectUserProfile,
    selectUserInfo,
})

export default withReduxSaga(connect(mapStateToProps)(UserProfilePage));
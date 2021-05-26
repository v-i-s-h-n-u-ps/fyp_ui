import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "../..";
import { 
    selectSearchResults, selectIsSearching, selectUserInfo,
    selectThemePreference
} from "@redux/user/selectors"
import { searchUsers } from "@redux/user/actions";
import {
    selectNewChat
} from "@redux/miscellaneous/selectors";
import Forum from "@screens/Forum";

const ForumPage = (props) => <Forum {...props} />;

ForumPage.getInitialProps = async (props) => {
    const { isServer } = props.ctx;
    let { req, asPath } = props.ctx;

    req = req || { headers: { host: window.location.host } };

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

const mapStateToProps = createStructuredSelector({
    selectSearchResults, selectIsSearching, selectUserInfo,
    selectNewChat, selectThemePreference
})

const mapDispatchToProps = dispatch => {
    return {
        d__searchUsers: data => dispatch(searchUsers.request(data))
    }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(ForumPage));
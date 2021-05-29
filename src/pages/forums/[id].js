import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "../..";
import {
    selectUserInfo, selectThemePreference
} from "@redux/user/selectors"
import { globalModalFlag } from "@redux/auxiliary/actions";
import {
    selectForumDetails
} from "@redux/forums/selectors";
import {
    getForumDetails, manageForumMembers
} from "@redux/forums/actions";
import Forum from "@screens/Forum";

const ForumPage = (props) => <Forum {...props} />;

ForumPage.getInitialProps = async (props) => {
    const { isServer, store } = props.ctx;
    let { req, asPath, query } = props.ctx;

    req = req || { headers: { host: window.location.host } };

    await store.dispatch(getForumDetails.request({ id: query.id }))

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

const mapStateToProps = createStructuredSelector({
    selectUserInfo, selectThemePreference, selectForumDetails
})

const mapDispatchToProps = dispatch => {
    return {
        d__globalModalFlag: (modal, data) => dispatch(globalModalFlag.set(modal, data)),
        d__manageForumMembers: data => dispatch(manageForumMembers.request(data))
    }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(ForumPage));

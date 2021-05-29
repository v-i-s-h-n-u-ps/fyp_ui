import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "../..";
import { 
    selectUserInfo,
} from "@redux/user/selectors"
import { searchUsers } from "@redux/user/actions";
import {
    selectForums
} from "@redux/forums/selectors";
import {
    getForums
} from "@redux/forums/actions";
import {
    globalModalFlag
} from "@redux/auxiliary/actions";
import Forums from "@screens/Forums";

const ForumsPage = props => <Forums {...props} />;

ForumsPage.getInitialProps = async (props) => {
    const { isServer, store } = props.ctx;
    let { req, asPath } = props.ctx;

    req = req || { headers: { host: window.location.host } };
    
    await store.dispatch(getForums.request());

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

const mapStateToProps = createStructuredSelector({
    selectUserInfo, selectForums
})

const mapDispatchToProps = dispatch => {
    return {
        d__globalModalFlag: (modal, data) => dispatch(globalModalFlag.set(modal, data))
    }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(ForumsPage));
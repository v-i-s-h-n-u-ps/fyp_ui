import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "../..";
import { globalModalFlag } from "@redux/auxiliary/actions";
import {
    getMyProjects, deleteProjects, updateProject
} from "@redux/projects/actions";
import { 
    selectMyProjects, selectIsLoadingProjects
} from "@redux/projects/selectors";
import {
    selectUserInfo
} from "@redux/user/selectors";
import Groups from "@screens/Groups";

const GroupsPage = (props) => <Groups {...props} />

GroupsPage.getInitialProps = async (props) => {
    const { isServer, store } = props.ctx;
    let { req, asPath } = props.ctx;

    req = req || { headers: { host: window.location.host } };

    await store.dispatch(getMyProjects.request())

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

const mapDispatchToProps = dispatch => {
    return {
        d__setGlobalModalFlag: (modal, data) => dispatch(globalModalFlag.set(modal, data)),
        d__unSetGlobalModalFlag: () => dispatch(globalModalFlag.unset()),
        d__deleteProjects: data => dispatch(deleteProjects.request(data)),
        d__updateProject: data => dispatch(updateProject.request(data))
    }
}

const mapStateToProps = createStructuredSelector({ 
    selectMyProjects, selectIsLoadingProjects,
    selectUserInfo
})

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(GroupsPage));

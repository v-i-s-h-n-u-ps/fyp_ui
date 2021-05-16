import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "../..";
import {
    createProject, updateProject, getMyProjects
} from "@redux/projects/actions";
import {
    selectIsLoadingProjects, selectIsProjectSubmitting, 
    selectMyProjects
} from "@redux/projects/selectors";
import {
    selectUserInfo, selectStudentInfo, selectThemePreference
} from "@redux/user/selectors";
import {
    selectUniversity, selectCategory
} from "@redux/resources/selectors";
import Profile from "@screens/Profile";

const DashboardPage = (props) => {
    return <Profile {...props} />
};

DashboardPage.getInitialProps = async (props) => {
    const { isServer, store } = props.ctx;
    let { req, asPath } = props.ctx;

    req = req || { headers: { host: window.location.host } };

    await store.dispatch(getMyProjects.request())

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

const mapStateToProps = createStructuredSelector({
    selectUserInfo, selectStudentInfo,
    selectMyProjects, selectIsLoadingProjects,
    selectIsProjectSubmitting, selectUniversity,
    selectThemePreference, selectCategory
})

const mapDispatchToProps = dispatch => {
    return {
        d__createProject: data => dispatch(createProject.request(data)),
        d__updateProject: data => dispatch(updateProject.request(data)),
    }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(DashboardPage));
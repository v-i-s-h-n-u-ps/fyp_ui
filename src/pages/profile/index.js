import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "../..";
import { globalModalFlag } from "@redux/auxiliary/actions";
import {
    createProject, updateProject, getMyProjects,
    deleteProjects
} from "@redux/projects/actions";
import {
    selectIsLoadingProjects, selectIsProjectSubmitting, 
    selectMyProjects
} from "@redux/projects/selectors";
import {
    selectUserInfo, selectStudentInfo, selectThemePreference,
    selectIsFormSubmitting
} from "@redux/user/selectors";
import { 
    updateUser, changePassword
} from "@redux/user/actions";
import {
    selectUniversity, selectCategory
} from "@redux/resources/selectors";
import Profile from "@screens/Profile";

const ProfilePage = (props) =>  <Profile {...props} />

ProfilePage.getInitialProps = async (props) => {
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
    selectThemePreference, selectCategory,
    selectIsFormSubmitting
})

const mapDispatchToProps = dispatch => {
    return {
        d__createProject: data => dispatch(createProject.request(data)),
        d__updateProject: data => dispatch(updateProject.request(data)),
        d__deleteProjects: data => dispatch(deleteProjects.request(data)),
        d__updateUser: data => dispatch(updateUser.request(data)),
        d__changePassword: data => dispatch(changePassword.request(data)),
        d__globalModalFlag: (modal, data) => dispatch(globalModalFlag.set(modal, data)),
        d__globalModalFlagUnset: () => dispatch(globalModalFlag.unset())
    }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
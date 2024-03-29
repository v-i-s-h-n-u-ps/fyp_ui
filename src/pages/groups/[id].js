import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "../../../src";
import { globalModalFlag } from "@redux/auxiliary/actions";
import { searchUsers } from "@redux/user/actions";
import { 
    getProjectDetails, getProjectParticipants,
    getProjectTask, addProjectTask, updateProjectTask,
    manageProjectParticipants, updateProject
} from "@redux/projects/actions";
import { 
    selectProjectDetails, selectProjectTasks,
    selectProjectTasksIsUpdating
} from "@redux/projects/selectors";
import { 
    selectUserInfo, selectThemePreference, selectSearchResults,
    selectIsSearching
} from "@redux/user/selectors";
import {
    selectType
} from "@redux/resources/selectors";
import ProjectDetails from "@screens/ProjectDetails";

const ProjectDetailsPage = (props) => <ProjectDetails {...props} />;

ProjectDetailsPage.getInitialProps = async (props) => {
    const { isServer, store } = props.ctx;
    let { req, asPath } = props.ctx;

    const { id } = props.ctx.query;

    await store.dispatch(getProjectDetails.unset());
    await store.dispatch(getProjectDetails.request({ id }));

    req = req || { headers: { host: window.location.host } };

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer, id };
};

const mapStateToProps = createStructuredSelector({
    selectProjectDetails, selectUserInfo,
    selectThemePreference, selectProjectTasks,
    selectProjectTasksIsUpdating, selectType,
    selectSearchResults, selectIsSearching
})

const mapDispatchToProps = dispatch => {
    return {
        d__getProjectParticipants: data => dispatch(getProjectParticipants.request(data)),
        d__getProjectTask: data => dispatch(getProjectTask.request(data)),
        d__updateProjectTask: data => dispatch(updateProjectTask.request(data)),
        d__addProjectTask: data => dispatch(addProjectTask.request(data)),
        d__searchUsers: data => dispatch(searchUsers.request(data)),
        d__manageProjectParticipants: data => dispatch(manageProjectParticipants.request(data)),
        d__setGlobalModalFlag: (modal, data) => dispatch(globalModalFlag.set(modal, data)),
        d__updateProject: data => dispatch(updateProject.request(data)),
        d__unsetGlobalModalFlag: () => dispatch(globalModalFlag.unset()),
    }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsPage));
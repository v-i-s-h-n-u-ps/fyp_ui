import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import withReduxSaga from "../../../src";
import { 
    getProjectDetails, getProjectParticipants
} from "@redux/projects/actions";
import { selectProjectDetails } from "@redux/projects/selectors";
import { 
    selectUserInfo, selectThemePreference
} from "@redux/user/selectors";
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
    selectThemePreference
})

const mapDispatchToProps = dispatch => {
    return {
        d__getProjectParticipants: data => dispatch(getProjectParticipants.request(data))
    }
}

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsPage));
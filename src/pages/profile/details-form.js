import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import withReduxSaga from "../..";
import { 
    selectUniversity, selectCategory
} from "@redux/resources/selectors";
import { 
    selectIsSavingStudent, selectUserInfo, selectThemePreference,
    selectStudentInfo
} from "@redux/user/selectors";
import { saveStudent, updateStudent } from "@redux/user/actions";
import FillStudentDetails from "@screens/FillStudentDetails";

const FillStudentDetailsPage = props => <FillStudentDetails {...props} />

FillStudentDetailsPage.getInitialProps = async (props) => {
    const { isServer } = props.ctx;
    let { req, asPath } = props.ctx;

    req = req || { headers: { host: window.location.host } };

    let hostURL = `https://${req.headers.host}`;
    let fullURL = `https://${req.headers.host}${asPath}`;

    return { hostURL, fullURL, isServer };
};

const mapStateToProps = createStructuredSelector({
    selectUniversity, selectIsSavingStudent, selectCategory,
    selectUserInfo, selectThemePreference, selectStudentInfo
})

const mapDispatchToProps = dispatch => {
    return {
        d__saveStudent: data => dispatch(saveStudent.request(data)),
        d__updateStudent: data => dispatch(updateStudent.request(data))
    }
} 

export default withReduxSaga(connect(mapStateToProps, mapDispatchToProps)(FillStudentDetailsPage));
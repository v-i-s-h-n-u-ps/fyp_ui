import React, { useEffect } from 'react'
import _get from "lodash/get"
import _isEmpty from "lodash/isEmpty";
import _includes from "lodash/includes";
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { createStructuredSelector } from "reselect";

import { FILL_STUDENT_DETAILS } from "@constants/routes";
import { selectStudentInfo, selectUserInfo, selectIsAuth } from "@redux/user/selectors";

const MidGuard = (props) => {
    const router = useRouter();

    const { selectStudentInfo, selectIsAuth } = props;

    useEffect(() => {
        if (selectIsAuth && !selectStudentInfo.default) {
            if (_isEmpty(selectStudentInfo))
                router.push(FILL_STUDENT_DETAILS)
        }
    }, [selectStudentInfo, router.pathname])

    return props.children

}

const mapStateToProps = createStructuredSelector({
    selectStudentInfo, selectUserInfo, selectIsAuth
})

export default connect(mapStateToProps)(MidGuard)

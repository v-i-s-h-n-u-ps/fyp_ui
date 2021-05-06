import React, { useEffect } from 'react'
import _get from "lodash/get"
import _isEmpty from "lodash/isEmpty";
import _includes from "lodash/includes";
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { createStructuredSelector } from "reselect";

import { DASHBOARD, FILL_STUDENT_DETAILS } from "@constants/routes";
import { selectStudentInfo, selectUserInfo, selectIsAuth } from "@redux/user/selectors";
import { university, role, type, category } from "@redux/resources/actions";
import { 
    selectCategory, selectType, selectRoles, selectUniversity 
} from "@redux/resources/selectors";

const MidGuard = (props) => {
    const router = useRouter();

    const { 
        selectStudentInfo, selectIsAuth, d__university, d__role,
        d__type, d__category, selectCategory, selectType,
        selectRoles, selectUniversity
    } = props;

    useEffect(() => {
        if (selectIsAuth && !selectStudentInfo.default) {
            if (_isEmpty(selectStudentInfo)){
                router.push(FILL_STUDENT_DETAILS)
            } else if(router.pathname === FILL_STUDENT_DETAILS && _isEmpty(router.query)) {
                router.push(DASHBOARD)
            }
        }
    }, [selectStudentInfo, router.pathname])

    useEffect(() => {
        !selectCategory.length && d__university();
        !selectRoles.length && d__role();
        !selectType.length && d__type();
        !selectUniversity.length && d__category();
    }, [selectIsAuth])

    return props.children

}

const mapStateToProps = createStructuredSelector({
    selectStudentInfo, selectUserInfo, selectIsAuth,
    selectCategory, selectType, selectRoles, selectUniversity
})

const mapDispatchToProps = dispatch => {
    return {
        d__university: () => dispatch(university.request()),
        d__role: () => dispatch(role.request()),
        d__type: () => dispatch(type.request()),
        d__category: () => dispatch(category.request()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MidGuard)

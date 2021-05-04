import React from "react";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";
import Student from "@forms/Student";
import TalkJS from "@components/thirdParty/talkjs";

const init = {
    university: '',
    gender: '',
    about: '',
    facebook: '',
    resumeUrl: '',
    about: '',
    linkedIn: '',
    gmail: '',
    categories: [],
    dateOfBirth: ''
}

const FillStudentDetails = props => {

    const {
        selectUniversity, selectIsSavingStudent, d__saveStudent,
        selectCategory, selectUserInfo, selectThemePreference: { theme }
    } = props;

    const onSubmit = values => {
        d__saveStudent({ ...values });
    }

    return (
        <PageContainer>
            <div className={s.container}>
                {/* <TalkJS /> */}
                <Student
                    universityList={selectUniversity}
                    categoryList={selectCategory}
                    values={init}
                    submit={onSubmit}
                    selectIsSavingStudent={selectIsSavingStudent}
                    theme={theme}
                />
            </div>
        </PageContainer>
    )
}

export default FillStudentDetails

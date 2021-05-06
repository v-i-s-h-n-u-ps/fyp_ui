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
    dateOfBirth: '',
    twitter: ''
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
                <div className={s.formContainer}>
                    <div className={s.detailsArea}>
                        <h2>student information</h2>
                        <div>
                            <p>Let us know more about you...</p>
                            <p>Engage in our community and</p>
                            <p>collaborate with people near you...</p>
                        </div>
                    </div>
                    <div className={s.form}>
                        <div className={s.studentForm}>
                            <Student
                                universityList={selectUniversity}
                                categoryList={selectCategory}
                                values={init}
                                submit={onSubmit}
                                selectIsSavingStudent={selectIsSavingStudent}
                                theme={theme}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default FillStudentDetails

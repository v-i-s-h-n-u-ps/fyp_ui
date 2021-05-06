import React from "react";
import _get from "lodash/get";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";
import Student from "@forms/Student";

const init = {
    university: '',
    gender: '',
    about: '',
    facebook: '',
    resumeUrl: 'https://fyp-images-narvitaa.s3.ap-south-1.amazonaws.com/user/6a654704-6e3f-4464-a80f-a9e7d3c6d8ac/resume/requirement.txt',
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
                            <p>Hi, <b>{_get(selectUserInfo, 'name')}</b></p>
                            <br />
                            <p>Welcome to The Auxiliar</p>
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
                                selectUserInfo={selectUserInfo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default FillStudentDetails

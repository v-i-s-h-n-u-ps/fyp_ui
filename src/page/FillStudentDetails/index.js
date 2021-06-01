import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import _omit from "lodash/omit";
import { useRouter } from "next/router";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";
import Student from "@forms/Student";

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
    selectCategory, selectUserInfo, selectThemePreference: { theme },
    selectStudentInfo, d__updateStudent
  } = props;

  const router = useRouter();

  const [values, setValues] = useState(init);

  const onSubmit = values => {
    if (router.query.edit) {
      d__updateStudent({ ...values })
    } else {
      d__saveStudent({ ...values });
    }
  }

  useEffect(() => {
    if (router.query.edit) {
      const val = _omit(selectStudentInfo, ['user', 'activeProjects', 'createdAt', 'universityDetails'])
      const categories = selectStudentInfo.categories.map(category => category.category);
      const university = selectStudentInfo.universityDetails.id;
      setValues({
        ...val,
        categories,
        university
      })
    }
  }, [])

  return (
    <PageContainer name="Student Details">
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
                values={values}
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

import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import _omit from "lodash/omit";
import { createStructuredSelector } from "reselect";

import s from "./index.module.scss";
import { selectIsFormSubmitting } from "../../../redux/user/selectors";
import { signup } from "../../../redux/user/actions";
import { SIGNUP_VALIDATION } from "../../../utils/helpers/schemas.js";
import Button from "../../common/Button";
import Input from "../../common/Input";

const init = {
  name: "",
  email: "",
  password: "",
  confirm: "",
}

const Signup = props => {

  const { d__signup, selectIsFormSubmitting } = props

  const submit = (values, { setSubmitting }) => {
    setSubmitting(false);
    d__signup({
      role: 'student',
      ..._omit(values, ['confirm']),
    })
  }

  return (
    <div className={s.container}>
      <Formik
        enableReinitialize={true}
        initialValues={init}
        onSubmit={submit}
        validationSchema={SIGNUP_VALIDATION}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit} className={s.form}>
              <Input
                label="Name"
                name="name"
                handleChange={handleChange}
                value={values.name}
                error={errors.name && touched.name}
                helperText={errors.name && touched.name ? errors.name : ''}
              />
              <Input
                label="Email"
                name="email"
                handleChange={handleChange}
                value={values.email}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email ? errors.email : ''}
              />
              <Input
                label="Password"
                name="password"
                handleChange={handleChange}
                value={values.password}
                type="password"
                error={errors.password && touched.password}
                helperText={errors.password && touched.password ? errors.password : ''}
              />
              <Input
                label="Confirm Password"
                name="confirm"
                handleChange={handleChange}
                value={values.confirm}
                error={errors.confirm && touched.confirm}
                helperText={errors.confirm && touched.confirm ? errors.confirm : ''}
              />
              <div className={s.flexCenter}>
                <Button
                  type="secondary"
                  variant="hollow"
                  buttonType="submit"
                  text="Submit"
                  width={"150px"}
                  disabled={selectIsFormSubmitting}
                  loading={selectIsFormSubmitting}
                />
              </div>
            </form>
          )
        }}
      </Formik>

    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectIsFormSubmitting
})

const mapDispatchToProps = dispatch => {
  return {
    d__signup: data => dispatch(signup.request(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
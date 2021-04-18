import React, { useEffect } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";

import s from "./index.module.scss";
import { login, authentication } from "../../../redux/user/actions";
import {  GET_AUTH } from "../../../utils/services/auth";
import { LOGIN_VALIDATION } from "../../../utils/helpers/schemas.js";
import Button from "../../common/Button";
import Input from "../../common/Input";

const init = {
  email: "",
  password: "",
}

const Login = props => {

  const { d__login, d__authentication } = props
//   useEffect(() => {
//     const tk = GET_AUTH({})
//     d__authentication(tk)
//   }, [])

  return (
    <div className={s.container}>
      <Formik
        enableReinitialize={true}
        initialValues={init}
        onSubmit={d__login}
        validationSchema={LOGIN_VALIDATION}
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
                error={errors.password && touched.password}
                helperText={errors.password && touched.password ? errors.password : ''}
              />
              <div className={s.flexCenter}>
                <Button
                  type="primary"
                  variant="hollow"
                  buttonType="submit"
                  text="Login"
                  width={"150px"}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                />
              </div>
            </form>
          )
        }}
      </Formik>

    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    d__login: data => dispatch(login.request(data)),
    d__authentication: data => dispatch(authentication.request(data)),
  }
}

export default connect(null, mapDispatchToProps)(Login);
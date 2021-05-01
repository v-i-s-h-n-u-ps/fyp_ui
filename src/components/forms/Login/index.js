import React, { useState } from "react";
import { Formik } from "formik";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import s from "./index.module.scss";
import { login, authentication } from "@redux/user/actions";
import { selectIsFormSubmitting } from "@redux/user/selectors";
import { LOGIN_VALIDATION } from "@helpers/schemas";
import { FORGOT_PASSWORD } from "@constants/routes";
import Button from "@common/Button";
import Input from "@common/Input";

const init = {
  email: "",
  password: "",
}

const Login = props => {

  const { d__login, selectIsFormSubmitting } = props

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    d__login({ ...values });
  }

  return (
    <div className={s.container}>
      <Formik
        enableReinitialize={true}
        initialValues={init}
        onSubmit={onSubmit}
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
              <h3 className={s.subHead}>LOG IN</h3><br></br>
              <Input
                label="Email"
                name="email"
                handleChange={handleChange}
                value={values.email}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email ? errors.email : ''}
                autoFocus={true}
                showEdit={true}
                secondaryText={<i className={`icon-user ${s.userIcon}`} />}
              />
              <Input
                label="Password"
                name="password"
                handleChange={handleChange}
                type={showPassword ? 'text' : `password`}
                value={values.password}
                error={errors.password && touched.password}
                helperText={errors.password && touched.password ? errors.password : ''}
                showEdit={true}
                secondaryText={showPassword
                  ? <i className={`icon-eye ${s.iconOn}`} />
                  : <i className={`icon-eye_off ${s.iconOff}`} />
                }
                onSecondaryAction={() => setShowPassword(!showPassword)}
              />
              <div className={s.flexCenter}>
                <p
                  className={s.forgotPassword}
                  onClick={() => router.push(FORGOT_PASSWORD)}
                >
                  Forgot Password?
                </p>
                <Button
                  type="message"
                  variant="block"
                  buttonType="submit"
                  text="Login"
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
    d__login: data => dispatch(login.request(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
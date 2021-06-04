import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import _omit from "lodash/omit";
import _get from "lodash/get";
import { createStructuredSelector } from "reselect";

import s from "./index.module.scss";
import { selectIsFormSubmitting, selectSignUpError } from "@redux/user/selectors";
import { signup, unsetErrors } from "@redux/user/actions";
import { SIGNUP_VALIDATION } from "@utils/helpers/schemas";
import Button from "@common/Button";
import Input from "@common/Input";

const init = {
  name: "",
  email: "",
  password: "",
  confirm: "",
}

const Signup = props => {

  const { d__signup, selectIsFormSubmitting, setEmail, selectSignUpError, d__unsetErrors } = props

  const submit = (values, { setSubmitting }) => {
    setSubmitting(false);
    !!setEmail && setEmail(values.email)
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
          handleChange,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit} className={s.form}>
              <h3 className={s.subHead}>SIGN UP</h3><br></br>
              <div className={s.inputFields}>
                <Input
                  label="Name"
                  name="name"
                  handleChange={handleChange}
                  value={values.name}
                  error={errors.name && touched.name}
                  helperText={errors.name && touched.name ? errors.name : ''}
                  autoFocus={true}
                  showEdit={true}
                  secondaryText={<i className={`icon-user_outline ${s.icon} ${s.user}`} />}
                />
                <Input
                  label="Email"
                  name="email"
                  handleChange={e => { handleChange(e); d__unsetErrors() }}
                  value={values.email}
                  error={errors.email && touched.email || _get(selectSignUpError, 'email.0')}
                  helperText={errors.email && touched.email
                    ? errors.email
                    : _get(selectSignUpError, 'email.0')
                      ? _get(selectSignUpError, 'email.0')
                      : ''
                  }
                  showEdit={true}
                  secondaryText={<i className={`icon-mail ${s.icon} ${s.mail}`} />}
                />
                <Input
                  label="Password"
                  name="password"
                  handleChange={handleChange}
                  value={values.password}
                  type="password"
                  error={errors.password && touched.password}
                  helperText={errors.password && touched.password ? errors.password : ''}
                  showEdit={true}
                  secondaryText={<i className={`icon-lock ${s.icon} ${s.password}`} />}
                />
                <Input
                  label="Confirm Password"
                  name="confirm"
                  type="password"
                  handleChange={handleChange}
                  value={values.confirm}
                  error={errors.confirm && touched.confirm}
                  helperText={errors.confirm && touched.confirm ? errors.confirm : ''}
                  showEdit={true}
                  secondaryText={<i className={`icon-check_circle ${s.icon} ${(values.password === values.confirm && !!values.password) ? s.confirm : ""}`} />}
                />
              </div>
              <div className={s.flexCenter}>
                <Button
                  type="message"
                  variant="block"
                  buttonType="submit"
                  text="Signup"
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
  selectIsFormSubmitting, selectSignUpError
})

const mapDispatchToProps = dispatch => {
  return {
    d__signup: data => dispatch(signup.request(data)),
    d__unsetErrors: () => dispatch(unsetErrors.unset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
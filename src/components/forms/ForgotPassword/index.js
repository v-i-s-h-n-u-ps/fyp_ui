import React from "react";
import { Formik } from "formik";

import s from "./index.module.scss";
import { FORGOT_PASSWORD_VALIDATION } from "@helpers/schemas";
import RenderIfTrue from "../../_hoc/RenderIfTrue";
import Input from "@common/Input";
import Button from "@common/Button";

const ForgotPassword = props => {

  const { onSubmit, values, selectIsRequestSuccess, selectIsFormSubmitting } = props;

  const submit = (values, { setSubmitting }) => {
    setSubmitting(false);
    onSubmit({ ...values });
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{ ...values, isOtpSent: selectIsRequestSuccess }}
      onSubmit={submit}
      validationSchema={FORGOT_PASSWORD_VALIDATION}
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
              autoFocus={true}
              readOnly={selectIsRequestSuccess}
              showEdit={true}
              secondaryText={<i className={`icon-mail ${s.icon} ${s.mail}`} />}
            />
            <RenderIfTrue condition={selectIsRequestSuccess}>
              <Input
                label="OTP"
                name="otp"
                handleChange={handleChange}
                type={'number'}
                value={values.otp}
                error={errors.otp && touched.otp}
                helperText={errors.otp && touched.otp ? errors.otp : ''}
                showEdit={true}
                secondaryText={<i className={`icon-phonelink_lock ${s.icon} ${s.otp}`} />}
              />
              <Input
                label="Password"
                name="password"
                handleChange={handleChange}
                type={'password'}
                value={values.password}
                error={errors.password && touched.password}
                helperText={errors.password && touched.password ? errors.password : ''}
                showEdit={true}
                secondaryText={<i className={`icon-lock ${s.icon} ${s.password}`} />}
              />
              <Input
                label="Confirm Password"
                name="confirm"
                handleChange={handleChange}
                type={'password'}
                value={values.confirm}
                error={errors.confirm && touched.confirm}
                helperText={errors.confirm && touched.confirm ? errors.confirm : ''}
                showEdit={true}
                secondaryText={<i className={`icon-check_circle ${s.icon} ${(values.password === values.confirm && !!values.password) ? s.confirm : ""}`} />}
              />
            </RenderIfTrue>
            <div className={s.flexCenter}>
              <Button
                type="message"
                variant="block"
                buttonType="submit"
                text={selectIsRequestSuccess ? 'Update Password' : 'Continue'}
                disabled={selectIsFormSubmitting}
                loading={selectIsFormSubmitting}
              />
            </div>
          </form>
        )
      }}
    </Formik>
  )
}

export default ForgotPassword;

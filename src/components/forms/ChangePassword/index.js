import React from "react";
import { Formik } from "formik";

import s from "./index.module.scss";
import { CHANGE_PASSWORD_VALIDATION } from "@helpers/schemas";
import Input from "@common/Input";
import Button from "@common/Button";

const ChangePassword = props => {

  const { onSubmit, values, selectIsFormSubmitting } = props;

  const submit = (values, { setSubmitting }) => {
    setSubmitting(false);
    onSubmit({ ...values });
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={values}
      onSubmit={submit}
      validationSchema={CHANGE_PASSWORD_VALIDATION}
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
              label="Old password"
              name="old"
              handleChange={handleChange}
              autofill={"false"}
              value={values.old}
              error={errors.old && touched.old}
              helperText={errors.old && touched.old ? errors.old : ''}
            />
            <Input
              label="New Password"
              name="new"
              handleChange={handleChange}
              value={values.new}
              error={errors.new && touched.new}
              helperText={errors.new && touched.new ? errors.new : ''}
              autofill={"false"}
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
              autofill={"false"}
              secondaryText={<i className={`icon-check_circle ${s.icon} ${(values.new === values.confirm && !!values.new) ? s.confirm : ""}`} />}
            />
            <div className={s.flexCenter}>
              <Button
                type="message"
                variant="block"
                buttonType="submit"
                text={'Change Password'}
                loading={selectIsFormSubmitting}
              />
            </div>
          </form>
        )
      }}
    </Formik>
  )
}

export default ChangePassword;

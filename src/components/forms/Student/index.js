import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import _remove from "lodash/remove";
import _includes from "lodash/includes";
import _get from "lodash/get";
import DatePicker from "react-mobile-datepicker";
import dayjs from "dayjs";
import dynamic from 'next/dynamic'

import s from "./index.module.scss";
import { STUDENT_VALIDATION } from "@helpers/schemas";
import { dateConfig } from "@constants/config";
import Button from "@common/Button";
import Input from "@common/Input";

const S3Upload = dynamic(() => import('@components/thirdParty/s3'), { ssr: false });
const MultiSelect = dynamic(() => import('@common/MultiSelect'), { ssr: false });

const Student = props => {

  const {
    submit, selectIsSavingStudent, values, categoryList, universityList = [],
    theme = "light"
  } = props

  const [open, setOpen] = useState(false);

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    submit({ ...values });
  }

  useEffect(() => {
    if (open) {
      let picker = document.querySelector(
        "body > div.Modal-Portal > div > .datepicker"
      );
      let confirm = document.querySelector(
        "body > div.Modal-Portal > div > div > div.datepicker-navbar > a:nth-child(1)"
      );
      let cancel = document.querySelector(
        "body > div.Modal-Portal > div > div > div.datepicker-navbar > a:nth-child(2)"
      );
      picker.style.maxWidth = "650px";
      picker.style.left = "50%";
      picker.style.transform = "translate(-50%, 0)"
      confirm.innerHTML = "Confirm";
      cancel.innerHTML = "Cancel";
    }
  }, [open])

  return (
    <div className={s.container}>
      <Formik
        enableReinitialize={true}
        initialValues={values}
        onSubmit={onSubmit}
        validationSchema={STUDENT_VALIDATION}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          handleChange,
          handleSubmit,
        }) => {

          const date = new Date();
          const maxDate = new Date(date.setFullYear(date.getFullYear() - 15))
          const dateSelect = val => {
            setOpen(false);
            setFieldValue("dateOfBirth", dayjs(val).format("YYYY-MM-DD"))
          }

          console.log(universityList, 'university')

          return (
            <form onSubmit={handleSubmit} className={s.form}>
              <div className={s.header}>
                <p>Personal Information</p>
                <div />
              </div>
              <div className={s.multiInput}>
                <div>
                  <Input
                    label="Date of Birth"
                    name="dateOfBirth"
                    value={values.dateOfBirth}
                    readOnly={true}
                    focusCallback={() => setOpen(true)}
                    error={errors.dateOfBirth && touched.dateOfBirth}
                    helperText={errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : ''}
                    showEdit={true}
                    secondaryText={<i className={`icon-calendar ${s.icon}`} />}
                  />
                  <DatePicker
                    isOpen={open}
                    onSelect={dateSelect}
                    onCancel={() => setOpen(false)}
                    dateConfig={dateConfig}
                    theme={theme}
                    value={values.dateOfBirth ? new Date(values.dateOfBirth) : maxDate}
                    max={maxDate}
                    showCaption={true}
                    showHeader={false}
                  />
                </div>
              </div>
              <div className={s.dropDownContainer}>
                <MultiSelect
                  options={universityList}
                  selectedValues={values.university}
                  onSelect={(_, item) => setFieldValue('university', item.id)}
                  // onRemove={(_, item) => setFieldValue(values.categories.splice(item, 1))}
                  display="name"
                  name="university"
                  emptyMessage="No universities available. Please contact admin."
                  placeholder={!values.university.length ? 'University' : ''}
                  key="id"
                  label="University"
                  multiple={false}

                />
              </div>
              <MultiSelect
                options={categoryList}
                selectedValues={values.categories}
                onSelect={(_, item) => setFieldValue('categories', [...values.categories, item.id])}
                onRemove={(_, item) => setFieldValue(values.categories.splice(item, 1))}
                display="name"
                name="categories"
                emptyMessage="No other categories available. Please contact admin to add."
                placeholder={!values.categories.length ? 'Select Category' : ''}
                key="id"
                label="Category"
              />
              <div className={s.uploader}>
                <S3Upload
                  onUpload={data => setFieldValue("resumeUrl", _get(data, ''))}
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                text/plain, application/pdf"
                  error={errors.resumeUrl && touched.resumeUrl}
                  helperText={errors.resumeUrl && touched.resumeUrl ? errors.resumeUrl : ''}
                />
              </div>
              <div className={s.header}>
                <p>Social Media Information</p>
                <div />
              </div>
              <div className={s.multiInput}>
                <div className={s.social}>
                  <Input
                    label="GMail"
                    name="gmail"
                    value={values.gmail}
                    error={errors.gmail && touched.gmail}
                    helperText={errors.gmail && touched.gmail ? errors.gmail : ''}
                    showEdit={true}
                    secondaryText={<i className={`icon-calendar ${s.icon}`} />}
                  />
                </div>
                <div className={s.social}>
                  <Input
                    label="LinkedIn"
                    name="linkedIn"
                    value={values.linkedIn}
                    error={errors.linkedIn && touched.linkedIn}
                    helperText={errors.linkedIn && touched.linkedIn ? errors.linkedIn : ''}
                    showEdit={true}
                    secondaryText={<i className={`icon-calendar ${s.icon}`} />}
                  />
                </div>
              </div>
              <div className={s.multiInput}>
                <div className={s.social}>
                  <Input
                    label="Facebook"
                    name="facebook"
                    value={values.facebook}
                    error={errors.facebook && touched.facebook}
                    helperText={errors.facebook && touched.facebook ? errors.facebook : ''}
                    showEdit={true}
                    secondaryText={<i className={`icon-facebook ${s.icon}`} />}
                  />
                </div>
                <div className={s.social}>
                  <Input
                    label="Twitter"
                    name="twitter"
                    value={values.twitter}
                    error={errors.twitter && touched.twitter}
                    helperText={errors.twitter && touched.twitter ? errors.twitter : ''}
                    showEdit={true}
                    secondaryText={<i className={`icon-calendar ${s.icon}`} />}
                  />
                </div>
              </div>
              <div className={s.flexCenter}>
                <Button
                  type="message"
                  variant="block"
                  buttonType="submit"
                  text="Submit"
                  loading={selectIsSavingStudent || isSubmitting}
                />
              </div>
            </form>
          )
        }}
      </Formik>
    </div>
  )
}

export default (Student);

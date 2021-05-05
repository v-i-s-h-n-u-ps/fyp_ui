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
import Map from "@components/thirdParty/maps";

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
              <Input
                label="Email"
                name="email"
                handleChange={handleChange}
                value={values.email}
                error={errors.email && touched.email}
                helperText={errors.email && touched.email ? errors.email : ''}
                autoFocus={true}
              />
              <S3Upload 
                onUpload={data => setFieldValue("resumeUrl", _get(data, ''))}
                accept = "*"
                error={errors.resumeUrl && touched.resumeUrl}
                helperText={errors.resumeUrl && touched.resumeUrl ? errors.resumeUrl : ''}
              />
              <Map 
                locations={universityList} 
                latKey="latitude" 
                longKey="longitude"
                hoverComponent=""
              /> 
              <Input
                label="Date of Birth"
                name="dateOfBirth"
                value={values.dateOfBirth}
                readOnly={true}
                focusCallback={() => setOpen(true)}
                error={errors.dateOfBirth && touched.dateOfBirth}
                helperText={errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : ''}
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

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import _last from "lodash/last";
import _get from "lodash/get";
import DatePicker from "react-mobile-datepicker";
import dayjs from "dayjs";
import dynamic from 'next/dynamic';

import s from "./index.module.scss";
import { STUDENT_VALIDATION } from "@helpers/schemas";
import { removeFromMultiList } from "@helpers/";
import { GENDERS } from "@constants/config";
import { dateConfig } from "@constants/config";
import Button from "@common/Button";
import Input from "@common/Input";

const S3Upload = dynamic(() => import('@components/thirdParty/s3'), { ssr: false });
const MultiSelect = dynamic(() => import('@common/MultiSelect'), { ssr: false });

const Student = props => {

  const {
    submit, selectIsSavingStudent, values, categoryList, universityList = [],
    theme = "light", selectUserInfo
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

          return (
            <form onSubmit={handleSubmit} className={s.form}>
              <div className={s.header}>
                <p>Personal Information</p>
                <div />
              </div>
              <div className={s.multiInput}>
              <div className={s.social}>
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
                <div className={s.genderContainer}>
                  <div className={s.genders}>
                    {GENDERS.map((type, index) => (
                      <div
                        key={index}
                        className={`${s.typeValue} ${errors.university && touched.university ? s.error : ''}`}
                        onClick={() => setFieldValue('gender', type.key)}
                      >
                        <input
                          type="radio"
                          name={"gender"}
                          className={s.inputRadio}
                          checked={values.gender === type.key}
                          value={type.key}
                          onChange={() => setFieldValue('gender', type.key)}
                        />
                        <span>{type.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className={`${s.helperText} ${errors.about && touched.about ? s.error : ''}`}>
                    {errors.gender && touched.gender ? errors.gender : ''}
                  </p>
                </div>
              </div>
              <div className={s.dropDownContainer}>
                <MultiSelect
                  options={universityList}
                  selectedValues={values.university}
                  onSelect={(_, item) => setFieldValue('university', item.id)}
                  onRemove={(_, item) => setFieldValue('university', '')}
                  display="name"
                  name="university"
                  emptyMessage="No universities available. Please contact admin."
                  placeholder={!values.university.length ? 'University' : ''}
                  error={errors.university && touched.university}
                  helperText={errors.university && touched.university ? errors.university : ''}
                  selectionLimit={1}
                  key="id"
                  label="University"
                  multiple={true}
                />
              </div>
              <MultiSelect
                options={categoryList}
                selectedValues={values.categories}
                onSelect={(_, item) => setFieldValue('categories', [...values.categories, item.id])}
                onRemove={(_, item) => {setFieldValue('categories', removeFromMultiList([...values.categories], item, 'id'))}}
                display="name"
                name="categories"
                emptyMessage="No other categories available. Please contact admin to add."
                placeholder={!values.categories.length ? 'Select Category' : ''}
                error={errors.categories && touched.categories}
                helperText={errors.categories && touched.categories ? errors.categories : ''}
                key="id"
                label="Category"
              />
              <div className={s.uploader}>
                <S3Upload
                  accept="application/msword, application/vnd.ms-excel, 
                    application/vnd.ms-powerpoint,text/plain, application/pdf"
                  onUpload={data => setFieldValue('resumeUrl', _get(data, 'location'))}
                  value={values.resumeUrl ? _last(values.resumeUrl.split("/")) : ''}
                  error={errors.resumeUrl && touched.resumeUrl}
                  helperText={errors.resumeUrl && touched.resumeUrl ? errors.resumeUrl : ''}
                  directory={`user/${_get(selectUserInfo, 'id')}/resume`}
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
                    handleChange={handleChange}
                    error={errors.gmail && touched.gmail}
                    helperText={errors.gmail && touched.gmail ? errors.gmail : ''}
                    showEdit={true}
                    secondaryText={<i className={`icon-mail_circle ${s.icon}`} />}
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
                    handleChange={handleChange}
                    secondaryText={<i className={`icon-linkedin ${s.icon}`} />}
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
                    handleChange={handleChange}
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
                    handleChange={handleChange}
                    secondaryText={<i className={`icon-twitter ${s.icon}`} />}
                  />
                </div>
              </div>
              <div className={`${s.aboutYouContainer} ${errors.about && touched.about ? s.error : ''}`}>
                <p className={`${s.label} ${!!values.about ? s.active : ''} ${errors.about && touched.about ? s.error : ''}`}>About you</p>
                <textarea
                  rows={3}
                  placeholder={'Write something about you...'}
                  name={"about"}
                  value={values.about}
                  onChange={handleChange}
                />
                <div className={s.textareaBottom}>
                  <p>{errors.about && touched.about ? errors.about : ''}</p>
                  <span>
                    {values.about.length}/300
                                </span>
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

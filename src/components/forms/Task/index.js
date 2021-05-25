import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import DatePicker from "react-mobile-datepicker";
import dynamic from 'next/dynamic';
import dayjs from "dayjs";

import s from "./index.module.scss";
import { TASK_VALIDATION } from "@helpers/schemas";
import { dateConfig } from "@constants/config";
import Button from "@common/Button";
import Input from "@common/Input";

const MultiSelect = dynamic(() => import('@common/MultiSelect'), { ssr: false });

const init = {
  task: "",
  dueDate: "",
  type: ""
}

const Task = props => {

  const { submit, selectIsFormSubmitting, selectType, theme } = props

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
        initialValues={init}
        onSubmit={onSubmit}
        validationSchema={TASK_VALIDATION}
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
          const dateSelect = val => {
            setOpen(false);
            setFieldValue("dueDate", dayjs(val).format("YYYY-MM-DD"))
          }
          return (
            <form onSubmit={handleSubmit} className={s.form}>
              <DatePicker
                isOpen={open}
                onSelect={dateSelect}
                onCancel={() => setOpen(false)}
                dateConfig={dateConfig}
                theme={theme}
                value={values.dateOfBirth ? new Date(values.dateOfBirth) : new Date()}
                min={new Date()}
                showCaption={true}
                showHeader={false}
              />
              <div className={s.input}>
                <Input
                  label="Task"
                  name="task"
                  handleChange={handleChange}
                  value={values.task}
                  error={errors.task && touched.task}
                  helperText={errors.task && touched.task ? errors.task : ''}
                />
              </div>
              <div className={s.input}>
                <Input
                  label="Due Date"
                  name="dueDate"
                  value={values.dueDate}
                  readOnly={true}
                  focusCallback={() => setOpen(true)}
                  error={errors.dateOfBirth && touched.dueDate}
                  helperText={errors.dueDate && touched.dueDate ? errors.dueDate : ''}
                />
              </div>
              <div className={`${s.input} ${s.multi}`}>
                <MultiSelect
                  options={selectType}
                  selectedValues={values.type}
                  onSelect={(_, item) => setFieldValue('type', item.id)}
                  display="name"
                  name="type"
                  placeholder={!values.type ? 'Type' : ''}
                  error={errors.type && touched.type}
                  helperText={errors.type && touched.type ? errors.type : ''}
                  key="id"
                  label="Type"
                  multiple={false}
                  showInput={!values.type}
                />
              </div>
              <div className={s.inputButton}>
                <Button
                  type="primary"
                  variant="hollow"
                  buttonType="submit"
                  text="Create"
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


export default Task
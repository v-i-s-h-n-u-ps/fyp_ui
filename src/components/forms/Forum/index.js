import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import dynamic from 'next/dynamic';

import s from "./index.module.scss";
import { removeFromMultiList } from "@helpers/";
import { selectCategory } from "@redux/resources/selectors";
import { createForums, updateForums } from "@redux/forums/actions";
import { selectIsForumSubmitting } from "@redux/forums/selectors";
import { FORUM_VALIDATION } from "@helpers/schemas";
import Button from "@common/Button";
import Input from "@common/Input";
import TextArea from "@common/TextArea";

const MultiSelect = dynamic(() => import('@common/MultiSelect'), { ssr: false });

const init = {
  name: "",
  description: "",
  type: "public",
  categories: [],
}

const Forum = props => {

  const {
    d__createForums, d__updateForums, selectIsForumSubmitting, value = {},
    selectCategory
  } = props

  const [values, setValues] = useState({ ...init });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    if (!!values.id)
      d__updateForums({ ...values });
    else
      d__createForums({ ...values })
  }

  useEffect(() => {
    setValues({ ...init, ...value })
  }, [value])

  return (
    <div className={s.container}>
      <Formik
        enableReinitialize={true}
        initialValues={values}
        onSubmit={onSubmit}
        validationSchema={FORUM_VALIDATION}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => {
          return (
            <form onSubmit={handleSubmit} className={s.form}>
              <h3 className={s.subHead}>Create Forum</h3><br></br>
              <Input
                label="Forum Name"
                name="name"
                handleChange={handleChange}
                value={values.name}
                error={errors.name && touched.name}
                helperText={errors.name && touched.name ? errors.name : ''}
              />
              <MultiSelect
                options={selectCategory}
                selectedValues={values.categories}
                onSelect={(_, item) => setFieldValue('categories', [...values.categories, item.id])}
                onRemove={(_, item) => setFieldValue('categories', removeFromMultiList([...values.categories], item, 'id'))}
                display="name"
                name="categories"
                emptyMessage="No other categories available. Please contact admin to add."
                placeholder={!values.categories.length ? 'Select Category' : ''}
                error={errors.categories && touched.categories}
                helperText={errors.categories && touched.categories ? errors.categories : ''}
                key="id"
                label="Category"
              />
              <TextArea
                onChange={handleChange}
                rows={3}
                placeholder='Start your discussion...'
                name='description'
                value={values.description}
                label={'Description'}
                error={errors.description && touched.description}
                helperText={errors.description && touched.description ? errors.description : ''}
              />
              <div className={s.flexCenter}>
                <Button
                  type="message"
                  variant="block"
                  buttonType="submit"
                  text={values.id ? 'Update Forum' : 'Create Forum'}
                  loading={selectIsForumSubmitting}
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
  selectIsForumSubmitting, selectCategory
})

const mapDispatchToProps = dispatch => {
  return {
    d__createForums: data => dispatch(createForums.request(data)),
    d__updateForums: data => dispatch(updateForums.request(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Forum);
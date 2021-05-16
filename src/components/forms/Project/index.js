import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import dynamic from 'next/dynamic';
import DatePicker from "react-mobile-datepicker";
import dayjs from "dayjs";

import s from "./index.module.scss";
import { PROJECT_VALIDATION } from "@helpers/schemas";
import { dateConfig } from "@constants/config";
import Button from "@common/Button";
import Input from "@common/Input";

const MultiSelect = dynamic(() => import('@common/MultiSelect'), { ssr: false });

const Project = props => {

    const {
        onSubmit, selectIsFormSubmitting, values = {}, selectUniversity = [],
        theme = "light", selectCategory, cancel
    } = props

    const [open, setOpen] = useState({
        open: false,
        field: ''
    });

    const submit = (values, { setSubmitting }) => {
        setSubmitting(false);
        onSubmit({ ...values });
    }

    useEffect(() => {
        if (open.open) {
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
                onSubmit={submit}
                validationSchema={PROJECT_VALIDATION}
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
                        console.log(open.field, "field")
                        setFieldValue(open.field, dayjs(val).format("YYYY-MM-DD"))
                    }
                    return (
                        <form onSubmit={handleSubmit} className={s.form}>
                            <h3 className={s.subHead}>Create your project</h3><br />
                            <DatePicker
                                isOpen={open.open}
                                onSelect={dateSelect}
                                onCancel={() => setOpen({ open: false, field: '' })}
                                dateConfig={dateConfig}
                                theme={theme}
                                value={values[open.field] ? new Date(values[open.field]) : new Date()}
                                min={new Date()}
                                showCaption={true}
                                showHeader={false}
                            />
                            <div className={s.flex}>
                                <Input
                                    label="Name"
                                    name="name"
                                    handleChange={handleChange}
                                    value={values.name}
                                    error={errors.name && touched.name}
                                    helperText={errors.name && touched.name ? errors.name : ''}
                                />
                                <MultiSelect
                                    options={selectUniversity}
                                    selectedValues={values.location}
                                    onSelect={(_, item) => setFieldValue('location', item.id)}
                                    display="name"
                                    name="location"
                                    emptyMessage="No universities available. Please contact admin."
                                    placeholder={values.location && values.location.length ? '' : 'University'}
                                    error={errors.location && touched.location}
                                    helperText={errors.location && touched.location ? errors.location : ''}
                                    key="id"
                                    label="University"
                                    multiple={false}
                                />
                            </div>
                            <div className={s.flex}>
                                <div className={s.social}>
                                    <Input
                                        label="Start Date"
                                        name="startDate"
                                        value={values.startDate}
                                        readOnly={true}
                                        focusCallback={() => setOpen({ open: true, field: 'startDate' })}
                                        error={errors.startDate && touched.startDate}
                                        helperText={errors.startDate && touched.startDate ? errors.startDate : ''}
                                    />
                                </div>
                                <div className={s.social}>
                                    <Input
                                        label="End Date"
                                        name="endDate"
                                        value={values.endDate}
                                        readOnly={true}
                                        focusCallback={() => setOpen({ open: true, field: 'endDate' })}
                                        error={errors.startDate && touched.startDate}
                                        helperText={errors.startDate && touched.startDate ? errors.startDate : ''}
                                    />
                                </div>
                            </div>
                            <MultiSelect
                                options={selectCategory}
                                selectedValues={values.categories}
                                onSelect={(_, item) => setFieldValue('categories', [...values.categories, item.id])}
                                onRemove={(_, item) => setFieldValue(values.categories.splice(item, 1))}
                                display="name"
                                name="categories"
                                emptyMessage="No other categories available. Please contact admin to add."
                                placeholder={!values.categories.length ? 'Select Category' : ''}
                                error={errors.categories && touched.categories}
                                helperText={errors.categories && touched.categories ? errors.categories : ''}
                                key="id"
                                label="Category"
                            />
                            <Input
                                label="Description"
                                name="description"
                                handleChange={handleChange}
                                value={values.description}
                                error={errors.description && touched.description}
                                helperText={errors.description && touched.description ? errors.description : ''}
                            />
                            <div className={s.flexCenter}>
                                <p className={s.cancel} onClick={cancel}>
                                    Cancel
                                </p>
                                <Button
                                    type="message"
                                    variant="block"
                                    buttonType="submit"
                                    text="Create"
                                    width="200px"
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

export default Project;

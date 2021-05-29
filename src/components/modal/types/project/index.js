
import React from "react";

import s from "./index.module.scss";
import Project from "@forms/Project";

const Forums = props => {

    const { modalData = {} } = props

    const { 
        onSubmit, selectIsFormSubmitting, selectUniversity, values,
        theme, cancel, selectCategory
    } = modalData;

    return (
        <div className={s.container}>
            <Project
                onSubmit={onSubmit}
                selectIsFormSubmitting={selectIsFormSubmitting}
                selectUniversity={selectUniversity}
                values={values}
                theme={theme}
                selectCategory={selectCategory}
                cancel={cancel}
            />
        </div>
    )
}

export default Forums

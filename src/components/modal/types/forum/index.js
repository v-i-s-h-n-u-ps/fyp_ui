
import React from "react";

import s from "./index.module.scss";
import Forum from "@forms/Forum";

const Forums = props => {

    const {
        selectForums, selectUserInfo, modalData = {}
    } = props

    return(
        <div className={s.container}>
            <Forum value={modalData.values} />
        </div>
    )
}

export default Forums


import React from "react";

import s from "./index.module.scss";
import Forum from "@forms/Forum";

const Forums = props => {

  const {
    modalData = {}
  } = props

  return (
    <div className={s.container}>
      <Forum value={modalData} />
    </div>
  )
}

export default Forums

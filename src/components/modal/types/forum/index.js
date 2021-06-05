
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import s from "./index.module.scss";
import { 
  selectIsForumSubmitting 
} from "@redux/forums/selectors"
import Forum from "@forms/Forum";
import prevState from "@hooks/prevState";

const Forums = props => {

  const {
    modalData = {}, selectIsForumSubmitting, close
  } = props

  const prevSubmitting = prevState(selectIsForumSubmitting);

  useEffect(() => {
    if(prevSubmitting && !selectIsForumSubmitting) {
      close();
    }
  }, [selectIsForumSubmitting])

  return (
    <div className={s.container}>
      <Forum value={modalData} />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectIsForumSubmitting
})

export default connect(mapStateToProps)(Forums)

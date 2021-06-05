
import React, { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import s from "./index.module.scss";
import { selectIsFormSubmitting } from "@redux/user/selectors";
import ChangePassword from "@forms/ChangePassword";
import prevState from "@hooks/prevState";

const PasswordChange = props => {

  const { modalData = {}, close, selectIsFormSubmitting } = props

  const {
    onSubmit, values
  } = modalData;

  const prevSubmitState = prevState(selectIsFormSubmitting);

  useEffect(() => {
    if(!selectIsFormSubmitting && prevSubmitState) {
      close();
    }
  }, [selectIsFormSubmitting])

  return (
    <div className={s.container}>
      <ChangePassword
        onSubmit={onSubmit}
        selectIsFormSubmitting={selectIsFormSubmitting}
        values={values}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectIsFormSubmitting
})

export default connect(mapStateToProps)(PasswordChange)

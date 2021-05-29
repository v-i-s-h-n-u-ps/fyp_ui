import React, { useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Router from "next/router";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

import s from "./index.module.scss";
import { selectGlobalModal } from "@redux/auxiliary/selectors";
import { globalModalFlag } from "@redux/auxiliary/actions";
import modalTypes from "./typesIndex";
import {
  selectStudentInfo
} from "@redux/user/selectors";


const GlobalModal = (props) => {
  const { selectGlobalModal, d__unsetGlobalModalFlag
  } = props;

  const [hideModal, setHideModal] = useState(0);

  const ModalType = modalTypes[selectGlobalModal.modalType];
  const closeModal = (e) => {
    e && e.stopPropagation();
    e && e.preventDefault();
    setHideModal(1);
    setTimeout(() => {
      d__unsetGlobalModalFlag();
      setHideModal(0);
    }, 400)

  }

  useEffect(() => {
    if (selectGlobalModal.isModal && !hideModal) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      if (selectGlobalModal.isModal && !hideModal) {
        document.body.style.removeProperty("overflow");
      }
    }
  }, [selectGlobalModal, hideModal]);

  Router.events.on('routeChangeComplete', (url) => {
    selectGlobalModal.isModal && closeModal();
  });

  Router.events.on('routeChangeError', (url) => {
    selectGlobalModal.isModal && closeModal();
  });

  const closeOnBlur = _get(selectGlobalModal, 'modalData.closeOnBlur', true);
  const showCloseButton = _get(selectGlobalModal, 'modalData.showCloseButton', true);

  return (
    <>
      { selectGlobalModal.isModal && selectGlobalModal.modalType ?
        <div className={`${s.modal} ${hideModal ? s.hide : ''} ${s[selectGlobalModal.modalType]}`}>
          <div className={`${s.dialog}`}>
            {showCloseButton &&
              <div className={s.close} onClick={(e) => { closeModal(e) }}>
                <i className={"icon-close"}></i>
              </div>
            }
            <ModalType
              modalData={selectGlobalModal.modalData}
              close={closeModal}
            />
          </div>
          <div className={`${s.overlay}`} onClick={closeOnBlur ? (e) => { closeModal(e) } : null}></div>
        </div>
        :
        null
      }
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  selectGlobalModal,
  selectStudentInfo,
});

const mapDispatchToProps = dispatch => {
  return {
    d__unsetGlobalModalFlag: () => dispatch(globalModalFlag.unset())
  };
};

export default
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(GlobalModal);

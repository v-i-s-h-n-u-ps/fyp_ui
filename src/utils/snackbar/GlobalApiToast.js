import React, { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get"

import { globalApiErrorFlag, globalApiSuccessFlag } from "../../redux/auxiliary/actions";
import { selectGlobalAPIError, selectGlobalAPISuccess } from "../../redux/auxiliary/selectors";

const GlobalApiToast = (props) => {

    let globalErrorMsg;
    let globalSuccessMsg;

    const { selectGlobalAPIError, selectGlobalAPISuccess } = props;

    const setErrorMessage = () => {
        if (_get(selectGlobalAPIError, 'message')) {
            globalErrorMsg = _get(selectGlobalAPIError, 'message.message') || 
            _get(selectGlobalAPIError, 'message.error_description') || _get(selectGlobalAPIError, 'message.error')
        } else {
            globalErrorMsg = "😓 Something went wrong!";
        }
    }
    const notify = val => {
        toast.error(val, {
            toastId: globalErrorMsg,
            onClose: onErrorCloseCb
        });
    };

    const setSuccessMessage = () =>
        globalSuccessMsg = _get(selectGlobalAPISuccess, 'message');

    const notifySuccess = msg =>
        toast.info(msg, { toastId: globalSuccessMsg, onClose: onSuccessCloseCb });

    const onSuccessCloseCb = () => props.d__globalApiSuccessFlag();

    const onErrorCloseCb = () => props.d__globalApiErrorFlag();

    useEffect(() => {
        if (!_isEmpty(selectGlobalAPIError) && !!_get(selectGlobalAPIError, 'actionTriggered')) {
            setErrorMessage();
            notify(globalErrorMsg)
        }
    }, [selectGlobalAPIError])


    useEffect(() => {
        if (!_isEmpty(selectGlobalAPISuccess) && !!_get(selectGlobalAPISuccess, 'message')) {
            setSuccessMessage();
            notifySuccess(globalSuccessMsg);
        }
    }, [selectGlobalAPISuccess]);

    return (
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            limit={3} />
    )
}
const mapStateToProps = createStructuredSelector({
    selectGlobalAPIError: selectGlobalAPIError,
    selectGlobalAPISuccess: selectGlobalAPISuccess
});

const mapDispatchToProps = (dispatch) => {
    return {
        d__globalApiErrorFlag: () => {
            dispatch(globalApiErrorFlag.unset())
        },
        d__globalApiSuccessFlag: () => {
            dispatch(globalApiSuccessFlag.unset())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GlobalApiToast)
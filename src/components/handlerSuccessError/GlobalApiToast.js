import React,{useEffect} from "react";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {get as _get} from "lodash"
import { ToastContainer, toast } from 'react-toastify';
import {selectGlobalAPIError, selectGlobalAPISuccess} from "../../redux/auxiliary/selectors";
import {isEmpty as _isEmpty} from "lodash"
import {globalApiErrorFlag, globalApiSuccessFlag} from "../../redux/auxiliary/actions";


const GlobalApiToast = (props) =>{
    const {selectGlobalAPIError,selectGlobalAPISuccess} = props;
    let globalErrorMsg;
    let globalSuccessMsg;

    useEffect(()=>{
        if( !_isEmpty(selectGlobalAPIError) && !!_get(selectGlobalAPIError,'actionTriggered')){
            setErrorMessage();
            notify(globalErrorMsg)
        }
    },[selectGlobalAPIError])

    const setErrorMessage = ()=>{
        const errorCode = _get(selectGlobalAPIError,'code')
        switch (errorCode) {
            case 400:
            case "SERVER_ERROR": {globalErrorMsg = `😓 ${_get(selectGlobalAPIError,'message')}`;break;}
            case "NETWORK_ERROR_CUSTOM": {globalErrorMsg = "🛠 Server is currently unavailable";break;}
            default: {globalErrorMsg = "😓 Something went wrong!";}
        }
    }
    const notify = (val) => {toast.error(val,{toastId:globalErrorMsg ,onClose:onErrorCloseCb});};
    const onErrorCloseCb = () =>{props.d__globalApiErrorFlag();}

    // for success
    useEffect(()=>{
        // console.log("selectGlobalAPISuccessselectGlobalAPISuccess",selectGlobalAPISuccess)
        if( !_isEmpty(selectGlobalAPISuccess) && !!_get(selectGlobalAPISuccess,'message')){
            setSuccessMessage();
            notifySuccess(globalSuccessMsg)
        }
    },[selectGlobalAPISuccess])

    const setSuccessMessage = ()=>{globalSuccessMsg=_get(selectGlobalAPISuccess,'message')}
    const notifySuccess = (msg) => toast.info(msg,{toastId:globalSuccessMsg, onClose:onSuccessCloseCb});
    const onSuccessCloseCb = () =>{props.d__globalApiSuccessFlag()}

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
            limit={3}/>
    )
}
const mapStateToProps = createStructuredSelector({
    selectGlobalAPIError:selectGlobalAPIError,
    selectGlobalAPISuccess:selectGlobalAPISuccess
});

const mapDispatchToProps = (dispatch) => {
    return {
        d__globalApiErrorFlag:()=>{
            dispatch(globalApiErrorFlag.unset())
        },
        d__globalApiSuccessFlag:()=>{
            dispatch(globalApiSuccessFlag.unset())
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GlobalApiToast)
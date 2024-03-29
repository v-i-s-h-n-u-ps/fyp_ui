import React, { useState, useEffect, useRef } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import s from "./index.module.scss";
import { leadingZero } from "@helpers/";
import { activate, resendOTP } from "@redux/user/actions";
import { selectIsFormSubmitting, selectIsOtpSent } from "@redux/user/selectors";
import Button from "@common/Button";

const OTP = props => {

  const {
    email, d__activate, selectIsFormSubmitting, d__resendOTP, selectIsOtpSent
  } = props;

  const [otp, setOtp] = useState('');
  const [value, setValue] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);

  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();
  const input6 = useRef();

  const inputOTP = (index, event, ref) => {
    let o = [...value];
    let val = event.target.value;
    if (!/^[0-9]\b/.test(val) && val !== "") return;

    if (val === "" || value[index - 1] === "") {
      o[index - 1] = val;
    }
    setValue(o);
    if (o[index - 1] !== "" && !!ref)
      ref.current.focus();
  };

  const backspace = (index, event, ref) => {
    let otp = [...value];
    if (event.keyCode === 8) {
      if (index === 0 && otp[index] === "") return;
      if (otp[index - 1] === "") {
        otp[index - 2] = "";
        !!ref && ref.current.focus();
      }
    }
    setValue(otp)
  };

  const onSubmit = () => {
    d__activate({ email, otp });
  }

  useEffect(() => {
    setOtp(value.join(""));
  }, [value])

  useEffect(() => {
    if (selectIsOtpSent) {
      setTimer(60);
    }
  }, [selectIsOtpSent])

  useEffect(() => {
    if (timer) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer])

  return (
    <div className={s.container}>
      <div className={s.shieldContainer}>
        <i className={`icon-verified_user ${s.shieldIcon}`} />
      </div>
      <p className={s.labelMain}>Please Enter the OTP to Verify Your Account</p>
      <p className={s.labelSub}><i>Your One-Time Password has been sent to {email}</i></p>
      <br></br><br></br>
      <div className={`${s.otpInputsContainer}`}>
        <div className={`${s.inputContainer}`}>
          <div className={s.otpContainer}>
            <div className={s.otpCell}>
              <input
                type="number"
                value={value[0]}
                onChange={(event) => inputOTP(1, event, input2)}
                onKeyDown={(event) => backspace(1, event)}
                ref={input1}
                placeholder="-"
                max={9}
                min={0}
              />
            </div>
            <div className={s.otpCell}>
              <input
                type="number"

                value={value[1]}
                onChange={(event) => inputOTP(2, event, input3)}
                onKeyDown={(event) => backspace(2, event, input1)}
                ref={input2}
                placeholder="-"
                max={9}
                min={0}
              />
            </div>
            <div className={s.otpCell}>
              <input
                type="number"
                value={value[2]}
                onChange={(event) => inputOTP(3, event, input4)}
                onKeyDown={(event) => backspace(3, event, input2)}
                ref={input3}
                placeholder="-"
                max={9}
                min={0}
              />
            </div>
            <div className={s.otpCell}>
              <input
                type="number"
                value={value[3]}
                onChange={(event) => inputOTP(4, event, input5)}
                onKeyDown={(event) => backspace(4, event, input3)}
                ref={input4}
                placeholder="-"
                max={9}
                min={0}
              />
            </div>
            <div className={s.otpCell}>
              <input
                type="number"
                value={value[4]}
                onChange={(event) => inputOTP(5, event, input6)}
                onKeyDown={(event) => backspace(5, event, input4)}
                ref={input5}
                placeholder="-"
                max={9}
                min={0}
              />
            </div>
            <div className={s.otpCell}>
              <input
                type="number"
                value={value[5]}
                onChange={(event) => inputOTP(6, event)}
                onKeyDown={(event) => backspace(6, event, input5)}
                ref={input6}
                placeholder="-"
                max={9}
                min={0}
              />
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className={`${s.buttonContainer}`}>
        <Button
          text="Verify"
          type={"message"}
          onClick={onSubmit}
          disabled={otp.length !== 6 || selectIsFormSubmitting}
          loading={selectIsFormSubmitting}
        />
      </div>
      <div className={s.flexCenter}>
        {timer
          ? <p
            className={s.resendOTP}
          >
            Resend in: 00:{leadingZero(timer)}
          </p>
          : <p
            className={s.resendOTP}
            onClick={() => d__resendOTP({ email })}
          >
            Resend One-Time Password?
                </p>
        }
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectIsFormSubmitting, selectIsOtpSent
})

const mapDispatchToProps = dispatch => {
  return {
    d__activate: data => dispatch(activate.request(data)),
    d__resendOTP: data => dispatch(resendOTP.request(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTP);
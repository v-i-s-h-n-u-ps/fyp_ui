import React, { useState } from "react";
import _omit from "lodash/omit";

import s from "./index.module.scss";
import { ROOT } from "@constants/routes";
import ForgotPassword from "@forms/ForgotPassword";
import NavigateTo from "@common/navigateTo";

const init = {
    email: '',
    otp: '',
    password: '',
    confirm: '',
}

const ForgotPasswordPage = props => {

    const {
        selectIsRequestSuccess, selectIsFormSubmitting,
        d__passwordReset, d__passwordResetRequest
    } = props;

    const [email, setEmail] = useState("");

    const onSubmit = values => {
        setEmail(values.email);
        !!selectIsRequestSuccess
            ? d__passwordReset(_omit(values, ['confirm', 'isOtpSent']))
            : d__passwordResetRequest(_omit(values, ['confirm', 'password', 'isOtpSent', 'otp']))
    }

    return (
        <div className={s.container}>
            <NavigateTo
                title={"Back"}
                link={ROOT}
            />
            <div className={s.content}>
                <div className={s.forgotPassword}>
                    <h3 className={s.header}>Forgot Password</h3>
                    {selectIsRequestSuccess
                        ? <p className={s.description}>Verify your otp and enter new password</p>
                        : <p className={s.description}>Enter your registered email address</p>
                    }
                    <ForgotPassword
                        values={{ ...init, email: email }}
                        selectIsFormSubmitting={selectIsFormSubmitting}
                        selectIsRequestSuccess={selectIsRequestSuccess}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        </div>
    )

}

export default ForgotPasswordPage;

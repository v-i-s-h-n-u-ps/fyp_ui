import React, { useState } from "react";

import s from "./index.module.scss";
import Signup from "@forms/Signup";
import Login from "@forms/Login";
import Otp from "@forms/Otp";
import Button from "@common/Button";

const Access = props => {

  const { selectIsOtpSent } = props;

  const [active, setActive] = useState('login');
  const [email, setEmail] = useState("");

  return (
    <div className={s.container}>
      {selectIsOtpSent
        ? <Otp email={email}/>
        : (
          <div className={s.accessContainer}>
            <div className={s.formContainer}>
              {active === 'login'
                ? (
                  <div className={`${s.form} ${s.left}`}>
                    <Login setEmail={setEmail} />
                  </div>
                )
                : (
                  <div className={s.content}>
                    <h3>Have an Account?</h3><br></br>
                    <p>
                      Already a member?
                </p>
                    <p>
                      Go on and login to explore and collaborate.
                </p>
                    <br></br>
                    <div>

                      <Button
                        text={'Login'}
                        onClick={() => setActive("login")}
                        variant="hollow"
                        type="grey"
                      />
                    </div>
                  </div>
                )
              }
            </div>
            <div className={s.formContainer}>
              {active === 'signup'
                ? (
                  <div className={`${s.form} ${s.right}`}>
                    <Signup setEmail={setEmail} email={email} />
                  </div>
                )
                : (
                  <div className={s.content}>
                    <h3 className={s.noMember}>Not a member?</h3>
                    <div>
                      <Button
                        text={'Signup'}
                        onClick={() => setActive("signup")}
                        variant="hollow"
                        type="grey"
                      />
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
};

export default (Access);

import React, { useState } from "react";
import dynamic from "next/dynamic";

import s from "./index.module.scss";
import Signup from "@forms/Signup";
import Otp from "@forms/Otp";
import Button from "@common/Button";

const Login = dynamic(() => import("@forms/Login"), { ssr: false })

const Access = props => {

  const { selectIsOtpSent } = props;

  const [active, setActive] = useState('loginsd');
  const [email, setEmail] = useState("");

  return (
    <div className={s.container}>
      <div className={s.background} />
      <div className={s.main}>
        {selectIsOtpSent
          ? <Otp email={email} />
          : (
            <div className={s.accessContainer}>
              <div className={s.formContainer}>
                {active === 'login'
                  ? (
                    <div className={`${s.form} ${s.left}`}>
                      {/* <Login setEmail={setEmail} /> */}
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
                      {/* <Signup setEmail={setEmail} email={email} /> */}
                    </div>
                  )
                  : (
                    <div className={s.content}>
                      <h3 className={s.noMember}>Not a member?</h3>
                      <p>Join us today!</p>
                      <p>Create projects, form collaborations and have fun.</p>
                      <br></br>
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
    </div>
  );
};

export default (Access);

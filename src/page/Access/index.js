import React, { useState } from "react";
import { connect } from "react-redux";

import s from "./index.module.scss";
import Signup from "../../components/forms/Signup";
import Login from "../../components/forms/Login";
import Button from "../../components/common/Button";

const Access = props => {

  const [active, setActive] = useState('login');

  return (
    <div className={s.container}>
      <div className={s.accessContainer}>
        <div className={s.formContainer}>
          {active === 'login'
            ? (
              <div className={`${s.form} ${s.left}`}>
                <Login />
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
                <Signup />
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
    </div>
  );
};

export default (Access);

import React, { useState } from "react";
import { connect } from "react-redux";

import s from "./index.module.scss";
import Signup from "../../components/forms/Signup";
import Login from "../../components/forms/Login";

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
                <p>Already a member? Go on and login to explore and collaborate.</p><br></br>
                <p onClick={() => setActive("login")}>
                  Login
                </p>
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
                <div>
                  <p className={s.noMember}>Not a member?</p>
                </div>
                <p onClick={() => setActive("signup")}>
                  Signup
                </p>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default (Access);

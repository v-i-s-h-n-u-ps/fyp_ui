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
                <div className={s.content}>
                  <p onClick={() => setActive("login")}>
                    Login
                </p>
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

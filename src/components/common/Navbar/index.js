import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import _get from "lodash/get";
import Link from "next/link";

import s from "./index.module.scss";
import { selectUserInfo } from "@redux/user/selectors";
import { avatar } from "@constants/defaults";
import { PROFILE } from "@constants/routes";

const Navbar = props => {

  const { selectUserInfo } = props;

  return (
    <div className={s.container}>
      <div className={s.navContainer}>
        <Link href={PROFILE}>
          <div className={s.loggedInUser}>
            Welcome, <span>{_get(selectUserInfo, 'name', "").split(" ")[0]}</span>
            <div className={s.avatar}>
              <img src={_get(selectUserInfo, 'avatar', avatar)} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  selectUserInfo
})

export default connect(mapStateToProps)(Navbar)

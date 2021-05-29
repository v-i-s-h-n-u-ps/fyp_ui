import React from "react";

import s from "./index.module.scss";
import Sidebar from "@common/Sidebar";
import Navbar from "@common/Navbar";

const PageContainer = props => {

  const { active, showNav = true } = props;

  return (
    <>
      { showNav && <Navbar />}
      <Sidebar isServer={false} isAuth={true} userInfo={{}} authUser={{}} active={active} />
      <main className={`${s.mainContainer} ${s[active]}`} >
        {props.children}
      </main>
    </>
  );
};

export default PageContainer;
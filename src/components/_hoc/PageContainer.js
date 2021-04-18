import React from "react";

import s from "./index.module.scss";
import Sidebar from "../common/Sidebar";

const PageContainer = props => {

    const { active } = props;

    return (
        <>
            <Sidebar isServer={false} isAuth={true} userInfo={{}} authUser={{}} active={active} />
            <main className={`${s.mainContainer}`} >
                {props.children}
            </main>
        </>
    );
};

export default PageContainer;
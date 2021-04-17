import React from "react";
import s from "./index.module.scss";

const PageContainer = props => {
    return (
        <>
            <main className={`${s.mainContainer}`} >
                {props.children}
            </main>
        </>
    );
};

export default PageContainer;
import React, { useEffect, useState } from "react";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";

const Profile = props => {

    const { selectUserInfo } = props;

    console.log(selectUserInfo)

    return (
        <PageContainer active={"home"}>
            <div className={s.imageCover}>
                <div className={s.image}>
                    <img src={selectUserInfo.avatar} />
                </div>
            </div>
        </PageContainer>
    );
};

export default (Profile);

import React, { useEffect, useState } from "react";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";

const Profile = props => {

    return (
        <PageContainer active={"home"}>
            <div>
                <header className={s.header}></header>
                <div className={s.imageCover}>
                    <img src="https://fyp-images-narvitaa.s3.ap-south-1.amazonaws.com/default_avatar.png"></img>
                </div>
            </div>
        </PageContainer>
    );
};

export default (Profile);

import React, { useEffect, useState } from "react";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";
import Talkjs from "@components/thirdParty/talkjs";

const Chats = props => {

    return (
        <PageContainer active={"home"}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <Talkjs />
            </div>
        </PageContainer>
    );
};

export default (Chats);

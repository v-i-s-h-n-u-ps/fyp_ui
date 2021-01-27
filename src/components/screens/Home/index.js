import React from "react";
import { get as _get, isEmpty as _isEmpty } from "lodash";

import s from "./index.module.scss";
import PageContainer from "../../_hoc/PageContainer";

const CommunityHome = (props) => {

    return (
        <>
            <PageContainer active={"home"}>
                Hello
                <button className={s.button}>Send</button>
            </PageContainer>
        </>
    );
};

export default (CommunityHome);

import React, { useEffect, useState } from "react";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";
import Button from "@common/Button";
import Map from "@components/thirdParty/maps";
import Input from "@common/Input";

const Dashboard = props => {
    
    console.log("dashboard", props)

    return (
        <PageContainer active={"dashboard"}>
            <div className={s.container}>
                <div className={s.projectContainer}>
                    
                </div>
                <div className={s.maps}>
                    <Map />
                </div>
            </div>
        </PageContainer>
    );
};

export default (Dashboard);

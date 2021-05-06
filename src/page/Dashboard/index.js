import React, { useEffect, useState } from "react";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";
import Map from "@components/thirdParty/maps";

const Dashboard = props => {
    
    const { selectUniversity } = props;

    return (
        <PageContainer active={"dashboard"}>
            <div className={s.container}>
                <div className={s.projectContainer}>
                    
                </div>
                <div className={s.maps}>
                    <Map 
                        locations={selectUniversity} 
                        latKey = "latitude"
                        longKey = "longitude"
                    />
                </div>
            </div>
        </PageContainer>
    );
};

export default (Dashboard);

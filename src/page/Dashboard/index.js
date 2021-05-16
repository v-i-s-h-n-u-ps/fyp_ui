import React, { useEffect, useState } from "react";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";
import Map from "@components/thirdParty/maps";
import Button from "@common/Button";

const Dashboard = props => {

    const { selectUniversity, selectThemePreference: { theme } } = props;

    return (
        <PageContainer active={"dashboard"}>
            <div className={s.container}>
                <div className={s.projectContainer}>
                    <div className={s.projectCard}>
                        <div className={s.flexTop}>
                            <div>
                                <img src="https://fyp-images-narvitaa.s3.ap-south-1.amazonaws.com/default_avatar.png" className={s.image}></img>
                                <h5 className={s.subHead}>Project Name
                                <br></br>
                                    <p className={s.projectLeader}>Project Leader</p>
                                </h5>
                            </div>
                            <h5 className={s.projectLocation}>
                                <i className={`icon-map_pin ${s.pinIcon}`} />
                                Project Location
                            </h5>
                            <br></br>
                        </div>
                        <hr></hr>
                        <div className={s.flexCenter}>
                            <p className={s.projectDetails}>
                                Project Details <br></br>
                                Information here.
                            </p>
                            <Button
                                type="message"
                                variant="hollow"
                                buttonType="submit"
                                text="Send Message"
                            />
                        </div>
                    </div>
                </div>
                <div className={s.maps}>
                    <Map
                        locations={selectUniversity}
                        latKey="latitude"
                        longKey="longitude"
                        theme={theme}
                    />
                </div>
            </div>
        </PageContainer>
    );
};

export default (Dashboard);

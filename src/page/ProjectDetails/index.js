import React, { useEffect, useState } from "react";
import _get from "lodash/get";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";
import TalkJS from "@components/thirdParty/talkjs";
import PopUp from "@common/Popup";
import NavigateTo from "@common/NavigateTo";

const ProjectDetails = props => {

    const {
        selectProjectDetails, id, d__getProjectParticipants,
        selectUserInfo = {}, selectThemePreference: { theme }
    } = props;

    const [open, setOpen] = useState(false);

    const participants = _get(selectProjectDetails, 'participants', []);
    const leader = participants.filter(item => item.isLeader)[0];
    const userIsLeader = selectUserInfo.id === _get(leader, 'userId');

    useEffect(() => {
        d__getProjectParticipants({ id })
    }, [])

    // console.log("selectProjectDetails", participants, selectUserInfo)

    return (
        <PageContainer>
            <NavigateTo title={"Back"} />
            <div className={s.container}>
                <div className={s.projectDetails}>
                    <div className={s.descriptionContainer}>
                        <p className={s.heading}>about project</p>
                        <p className={s.description}>
                            {_get(selectProjectDetails, 'description', "No Description")}
                        </p>
                    </div>
                    <div className={s.participants}>
                        {_get(selectProjectDetails, 'participants', []).map(item => (
                            <div className={s.participant} key={item.userId}>
                                <div>
                                    <img src={item.avatar} />
                                    <p>{item.name}</p>
                                </div>
                                {userIsLeader && (
                                    <div className={s.icon}>
                                        <i
                                            className={`icon-triple_vertical_dots`}
                                            onClick={() => setOpen(true)}
                                        />
                                        <PopUp open={open} onClose={() => setOpen(false)}>
                                            asdasdada adsadada da dadasda
                                        </PopUp>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.talkjs}>
                    {!!_get(selectProjectDetails, "id") && (
                        <TalkJS
                            chatWith={_get(selectProjectDetails, 'participants', [])}
                            project={{
                                id: _get(selectProjectDetails, "id"),
                                name: _get(selectProjectDetails, "name")
                            }}
                            theme={theme}
                            mode="group"
                        />
                    )}

                </div>
            </div>
        </PageContainer>
    )
};

export default ProjectDetails
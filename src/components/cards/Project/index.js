import React from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import dayjs from "dayjs";

import s from "./index.module.scss";
import Button from "@common/Button";

const Project = props => {

    dayjs.extend(isSameOrAfter);

    const { project = {}, isLeader = false } = props;

    const { _default } = project;

    const isComplete =  project.isComplete;
    const isDeferred = project.isDeferred;
    const notStarted = dayjs().isSameOrAfter(dayjs("2021-02-19"))

    console.log(isLeader)

    return (
        <div className={`${s.projectContainer}`}>
            <div className={`${s.projectCard} ${_default ? s.default : ''}`}>
                <div className={s.flexTop}>
                    <div>
                        {_default
                            ? <div className={s.defaultImage} />
                            : <img src={project.avatar} className={s.image} />
                        }
                        <div className={s.projectLeaderDetails}>
                            <p className={s.subHead}>
                                {project.name}
                            </p>
                            <p className={s.projectLeader}>
                                {project.createdBy}
                            </p>
                        </div>
                    </div>
                    <h5 className={s.projectLocation}>
                        <i className={`icon-map_pin ${s.pinIcon}`} />
                        {project.university.name}
                    </h5>
                    <br></br>
                </div>
                <hr></hr>
                <div className={s.flexCenter}>
                    <span className={s.projectDetails}>
                        <p><i>Project Details</i></p>
                        <p>{project.description}</p>
                    </span>
                    <div className={s.button}>
                        <Button
                            type="message"
                            variant="hollow"
                            buttonType="submit"
                            text="Send Message"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project

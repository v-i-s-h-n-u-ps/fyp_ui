import React from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import dayjs from "dayjs";
import { useRouter } from "next/router";

import s from "./index.module.scss";
import { CHATS } from "@constants/routes";
import Button from "@common/Button";


const Project = props => {

  dayjs.extend(isSameOrAfter);

  const { project = {}, isLeader = false, showMessage, onClick } = props;

  const { _default } = project;

  const router = useRouter();
  const isComplete = project.isComplete;
  const isDeferred = project.isDeferred;
  const notStarted = dayjs().isSameOrAfter(dayjs("2021-02-19"));

  const sendMessage = () => {
    onClick({
      id: project.created_id,
      name: project.createdBy,
      avatar: project.avatar,
      email: project.email
    })
    router.push(CHATS);
  }

  return (
    <div className={`${s.projectContainer}`}>
      <div className={`${s.projectCard} ${_default ? s.default : ''}`}>
        <div className={s.flexTop}>
          <div className={s.details}>
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
          <div className={s.projectLocation}>
            <h5>
              <i className={`icon-map_pin ${s.pinIcon}`} />
              {project.university.name}
            </h5>
          </div>
          <br></br>
        </div>
        <hr></hr>
        <div className={s.flexCenter}>
          <span className={s.projectDetails}>
            <p><i>Project Details</i></p>
            <p className={s.description}>
              {project.description}
            </p>
          </span>
          {showMessage && (
            <div className={s.button}>
              <Button
                type="message"
                variant="hollow"
                text="Send Message"
                onClick={sendMessage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Project

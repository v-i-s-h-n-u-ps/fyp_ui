import React from "react";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import _get from "lodash/get";
import Link from "next/link";

import s from "./index.module.scss";
import { CHATS, GROUP, USER_PROFILE } from "@constants/routes";
import Button from "@common/Button";


const Project = props => {

  dayjs.extend(isSameOrAfter);

  const {
    project = {}, isLeader = false, showMessage, onClick, navigate = true,
    onDelete, onEdit, filterBy
  } = props;

  const { _default } = project;

  const router = useRouter();
  const isComplete = project.isComplete;
  const isDeferred = project.isDeferred;
  const started = dayjs().isSameOrAfter(dayjs(project.startDate));

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
        {isComplete
          ? <div className={s.ribbon}>Complete</div>
          : isLeader && <div className={s.ribbon}>
            <i
              className={`${s.edit} icon-pencil`}
              onClick={() => onEdit(project)}
            />
            {!started && <>
              <div />
              <i
                onClick={() => onDelete(project)}
                className={`${s.delete} icon-bin`}
              />
            </>}
          </div>
        }
        <div className={s.flexTop}>
          <div className={s.details}>
            {_default
              ? <div className={s.defaultImage} />
              : <Link href={{ pathname: USER_PROFILE, query: { id: project.created_id } }}>
                <img src={project.avatar} className={s.image} />
              </Link>
            }
            <div className={s.projectLeaderDetails}>
              {navigate
                ? <Link
                  href={{ pathname: GROUP, query: { id: project.id } }}
                  key={project._default ? undefined : project.id}
                >
                  <p className={`${s.subHead} ${s.hover}`}>
                    {project.name}
                  </p>
                </Link>
                : <p className={s.subHead}>
                  {project.name}
                </p>
              }
              <Link href={{ pathname: USER_PROFILE, query: { id: project.created_id } }}>
                <p className={s.projectLeader}>
                  {project.createdBy}
                </p>
              </Link>
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
                icon="send"
              />
            </div>
          )}
        </div>
        <div className={s.category}>
          {_get(project, 'categories', []).map(category => (
            <span 
              className={s.tag} 
              key={category.id}
              onClick={!!filterBy ? () => filterBy(category.category) : null}
            >
              {category.category_name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Project

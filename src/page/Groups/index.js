import React from "react";
import Link from "next/link";
import _get from "lodash/get";

import s from "./index.module.scss";
import { GROUP, PROFILE } from "@constants/routes";
import PageContainer from "@hoc/PageContainer";
import ProjectCard from "@cards/Project";

const Groups = props => {

  const {
    selectMyProjects, selectUserInfo, selectIsLoadingProjects
  } = props;

  return (
    <PageContainer>
      <div className={s.container}>
        {!selectMyProjects.length && !selectIsLoadingProjects
          ? <div className={s.noProjects}>
            You're not part of any projects. Please go to your profile and create one now.
                        <Link href={{ pathname: PROFILE, query: { tab: 'projects' } }} >
              <p>Create Project</p>
            </Link>
          </div>
          : selectMyProjects.map((project, index) => (
            <Link href={{ pathname: GROUP, query: { id: project.id } }} key={project._default ? undefined : project.id}>
              <div className={s.project}>
                <ProjectCard
                  project={project}
                  key={`project-${index}`}
                  isLeader={_get(selectUserInfo, 'id') === project.created_id}
                />
              </div>
            </Link>
          ))}
      </div>
    </PageContainer>
  )
};

export default Groups
import React from "react";
import _get from "lodash/get";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./index.module.scss";
import { noGroups } from "@constants/images";
import { PROFILE } from "@constants/routes";
import PageContainer from "@hoc/PageContainer";
import ProjectCard from "@cards/Project";
import EmptyState from "@common/EmptyState";

const Groups = props => {

  const {
    selectMyProjects, selectUserInfo, selectIsLoadingProjects,
    d__setGlobalModalFlag, d__unSetGlobalModalFlag, d__deleteProjects,
    d__updateProject
  } = props;

  const router = useRouter();

  const onDelete = project => {
    const modalData = {
      primaryText: `${project.name}`,
      secondaryText: 'Are you sure you want to delete this project',
      primaryActionText: 'Confirm',
      secondaryActionText: 'Cancel',
      primaryAction: () => d__deleteProjects({ id: project.id }),
      secondaryAction: d__unSetGlobalModalFlag,
      closeOnBlur: false,
      actionable: "selectIsProjectSubmitting"
    }
    d__setGlobalModalFlag('confirm', modalData);
  }

  const onEdit = project => {
    router.push({ pathname: PROFILE, query: { tab: 'projects', editItem: project.id } })
  }

  return (
    <PageContainer name="Your Projects">
      <div className={s.container}>
        {!selectMyProjects.length && !selectIsLoadingProjects
          ? <EmptyState
            message="You're not part of any projects. Please go to your profile to create one now."
            image={noGroups}
            link={{ pathname: PROFILE, query: { tab: 'projects' } }}
            text={"Create Project"}
          />
          : selectMyProjects.map((project, index) => (
            <div className={s.project} key={project._default ? undefined : project.id}>
              <ProjectCard
                project={project}
                key={`project-${index}`}
                isLeader={_get(selectUserInfo, 'id') === project.created_id}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>
          ))}
      </div>
    </PageContainer>
  )
};

export default Groups

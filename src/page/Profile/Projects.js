import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import _find from "lodash/find";
import { useRouter } from "next/router";

import s from "./Projects.module.scss";
import { noProfile } from "@constants/images";
import { PROFILE } from "@constants/routes";
import prevState from "@hooks/prevState"
import ProjectForm from "@forms/Project";
import Button from "@common/Button";
import ProjectCard from "@cards/Project";
import EmptyState from "@common/EmptyState";

const init = {
  name: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  categories: []
}

const Projects = props => {

  const {
    isLoading, isSubmitting, projects, onSubmit, selectUniversity,
    theme, selectCategory, selectUserInfo, location, onEdit, onDelete,
    editItem, showCreateButton = true, showActions = true, navigate = true
  } = props

  const [create, setCreate] = useState(false);
  const [values, setValues] = useState(init);

  const prev = prevState(isSubmitting)
  const router = useRouter();

  useEffect(() => {
    if (prev && !isSubmitting && create) {
      setCreate(false);
    }
  }, [isSubmitting])

  useEffect(() => {
    setValues({ ...values, location })
  }, [location])

  useEffect(() => {
    if (!!editItem) {
      const project = _find(projects, { id: editItem });
      setValues({
        name: project.name,
        location: project.university.id,
        startDate: project.startDate,
        endDate: project.endDate,
        description: project.description,
        categories: project.categories.map(item => item.category),
        id: project.id,
        isComplete: project.isComplete
      });
      setCreate(true);
      router.push({
        pathname: PROFILE,
        query: { tab: 'projects' }
      }, undefined, { shallow: true });
    }
  }, [editItem])

  return (
    <div className={s.container}>
      {create
        ? <ProjectForm
          onSubmit={onSubmit}
          selectIsFormSubmitting={isSubmitting}
          selectUniversity={selectUniversity}
          values={values}
          theme={theme}
          selectCategory={selectCategory}
          cancel={() => setCreate(false)}
        />
        : <>
          {showCreateButton && (
            <div className={s.buttonContainer}>
              <Button
                text="Create New Project"
                variant="hollow"
                type="primary"
                width="200px"
                onClick={() => setCreate(true)}
              />
            </div>
          )}
          {!!projects.length
            ? <div className={s.projectsContainer}>
              {projects.map((project, index) => (
                <div>
                  <ProjectCard
                    project={project}
                    key={`project-${index}`}
                    isLeader={showActions && _get(selectUserInfo, 'id') === project.created_id}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    navigate={false}
                  />
                </div>
              ))}
            </div>
            : (
              <EmptyState
                message={showActions
                  ? "Your are not part of any projects now, Create one now!"
                  : "User is not part of any projects currently"
                }
                image={noProfile}
              />
            )}
        </>
      }
    </div>
  )
}

export default Projects

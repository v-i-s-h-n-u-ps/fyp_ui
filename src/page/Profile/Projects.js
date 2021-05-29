import React, { useEffect, useState } from "react";
import _get from "lodash/get";

import s from "./Projects.module.scss";
import prevState from "@hooks/prevState"
import ProjectForm from "@forms/Project";
import Button from "@common/Button";
import ProjectCard from "@cards/Project";

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
    theme, selectCategory, selectUserInfo
  } = props

  const [create, setCreate] = useState(false);
  const [values, setValues] = useState(init);

  const prev = prevState(isSubmitting)

  useEffect(() => {
    if (prev && !isSubmitting && create) {
      setCreate(false);
    }
  }, [isSubmitting])

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
          <div className={s.buttonContainer}>
            <Button
              text="Create New Project"
              variant="hollow"
              type="primary"
              width="200px"
              onClick={() => setCreate(true)}
            />
          </div>
          <div className={s.projectsContainer}>
            {projects.map((project, index) => (
              <ProjectCard
                project={project}
                key={`project-${index}`}
                isLeader={_get(selectUserInfo, 'id') === project.created_id}
              />
            ))}
          </div>
        </>
      }
    </div>
  )
}

export default Projects

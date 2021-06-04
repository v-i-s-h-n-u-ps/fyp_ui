import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import _find from "lodash/find";
import { useRouter } from "next/router";

import s from "./Projects.module.scss";
import { PROFILE } from "@constants/routes";
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
    theme, selectCategory, selectUserInfo, location, onEdit, onDelete,
    editItem
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
              <div>
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
        </>
      }
    </div>
  )
}

export default Projects

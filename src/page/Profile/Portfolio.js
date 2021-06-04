import React from "react";

import s from "./Portfolio.module.scss";
import { noProjects } from "@constants/images";
import ProjectCard from "@cards/Project";
import EmptyState from "@common/EmptyState";

const Portfolio = props => {

  const { projects = [], showActions = true } = props;

  return (
    <div className={s.container}>
      {!!projects.length
        ? <div className={s.projectsContainer}>
          {projects.map((project, index) => (
            <ProjectCard
              project={project}
              key={`project-${index}`}
            />
          ))}
        </div>
        : (
          <EmptyState
            message={showActions
              ? "Your are not part of any projects now. Create one now"
              : "User is not part of any projects currently"
            }
            image={noProjects}
          />
        )}
    </div>
  )
}

export default Portfolio

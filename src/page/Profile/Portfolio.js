import React from "react";

import s from "./Portfolio.module.scss";
import ProjectCard from "@cards/Project";

const Portfolio = props => {

  const { projects = [] } = props;

  return (
    <div className={s.container}>
      <div className={s.projectsContainer}>
        {projects.map((project, index) => (
          <ProjectCard
            project={project}
            key={`project-${index}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Portfolio

import React from "react";
import Link from "next/link";
import _get from "lodash/get";

import s from "./index.module.scss";
import { GROUP } from "@constants/routes";
import PageContainer from "@hoc/PageContainer";
import ProjectCard from "@cards/Project";

const Groups = props => {

    const {
        selectMyProjects, selectUserInfo
    } = props;

    return (
        <PageContainer>
            <div className={s.container}>
                {selectMyProjects.map((project, index) => (
                    <Link href={GROUP} as={`/groups/${project.id}`}>
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
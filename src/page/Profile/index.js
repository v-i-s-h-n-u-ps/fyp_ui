import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import { useRouter } from "next/router";

import s from "./index.module.scss";
import { PROFILE } from "@constants/routes";
import PageContainer from "@hoc/PageContainer";
import Tabs from "@components/tabs";
import Details from "./Details";
import Portfolio from "./Portfolio";
import Projects from "./Projects";

const Profile = props => {

    const router = useRouter();

    const {
        selectUserInfo = {}, selectStudentInfo = {}, selectMyProjects = [], selectIsLoadingProjects,
        selectIsProjectSubmitting, d__createProject, d__updateProject, selectUniversity,
        selectThemePreference: { theme }, selectCategory
    } = props;

    const [activeTabValue, setActiveTabValue] = useState(_get(router, 'query.tab', 'portfolio'));

    const completedProjects = selectMyProjects.filter(item => item.isComplete);
    const currentProjects = selectMyProjects.filter(item => !item.isComplete);

    const setTab = (param) => {
        const tab = _get(param, 'tab.value', 'upload-file');
        setActiveTabValue(tab);
        router.push({ pathname: PROFILE, query: { tab } })
    }

    const tabItems = [
        {
            value: 'portfolio',
            label: "Portfolio",
        }, {
            value: 'projects',
            label: "Current Projects"
        }, {
            value: 'details',
            label: "Details"
        }
    ];

    const onSubmit = values => {
        if (values.id) {
            d__updateProject({ ...values });
        } else {
            d__createProject({ ...values })
        }
    }

    const components = {
        'portfolio': <Portfolio
            isLoading={selectIsLoadingProjects}
            projects={completedProjects}
        />,
        'projects': <Projects
            isLoading={selectIsLoadingProjects}
            isSubmitting={selectIsProjectSubmitting}
            projects={currentProjects}
            onSubmit={onSubmit}
            selectUniversity={selectUniversity}
            theme={theme}
            selectCategory={selectCategory}
            selectUserInfo={selectUserInfo}
        />,
        'details': <Details selectStudentInfo={selectStudentInfo} />,
    }

    console.log(completedProjects, currentProjects)

    return (
        <PageContainer active={"home"}>
            <div className={s.imageCover}>
                <div className={s.image}>
                    <img src={selectUserInfo.avatar} />
                </div>
            </div>
            <div className={s.account}>
                <div className={s.name}>
                    {_get(selectUserInfo, "name")}
                </div>
                <div className={s.email}>
                    {_get(selectUserInfo, "email")}
                </div>
                <div className={s.aboutMe}>
                    <label>About</label>
                    <p>{_get(selectStudentInfo, "about")}</p>
                    <div className={s.social}>
                        {_get(selectStudentInfo, "gmail") &&
                            <a href={`mailto:${_get(selectStudentInfo, "gmail")}`}>
                                <div className={s.icon}>
                                    <i className="icon-mail_circle" />
                                </div>
                            </a>
                        }
                        {_get(selectStudentInfo, "linkedIn") &&
                            <a href={_get(selectStudentInfo, "linkedIn")} target="_blank">
                                <div className={s.icon}>
                                    <i className="icon-linkedin" />
                                </div>
                            </a>
                        }
                        {_get(selectStudentInfo, "twitter") &&
                            <a href={_get(selectStudentInfo, "twitter")} target="_blank">
                                <div className={s.icon}>
                                    <i className="icon-twitter" />
                                </div>
                            </a>
                        }
                        {_get(selectStudentInfo, "facebook") &&
                            <a href={_get(selectStudentInfo, "facebook")} target="_blank">
                                <div className={s.icon}>
                                    <i className="icon-facebook" />
                                </div>
                            </a>
                        }
                    </div>
                </div>
                <Tabs data={tabItems} activeTabValue={activeTabValue} callback={setTab} />
                {components[activeTabValue]}
            </div>
        </PageContainer>
    );
};

export default (Profile);

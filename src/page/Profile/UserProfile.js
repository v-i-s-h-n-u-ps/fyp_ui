import React, { useState } from "react";
import _get from "lodash/get";
import { useRouter } from "next/router";

import s from "./index.module.scss";
import { PROFILE, USER_PROFILE } from "@constants/routes";
import PageContainer from "@hoc/PageContainer";
import Tabs from "@components/tabModule";
import Portfolio from "./Portfolio";
import Projects from "./Projects";
import Details from "./Details";

const Profile = props => {

  const router = useRouter();

  const {
    selectIsUserProfileLoading,
    selectUserProfile,
    selectUserInfo
  } = props;

  const [activeTabValue, setActiveTabValue] = useState(_get(router, 'query.tab', 'portfolio'));

  const completedProjects = _get(selectUserProfile, 'projects', []).filter(item => item.isComplete);
  const currentProjects = _get(selectUserProfile, 'projects', []).filter(item => !item.isComplete);

  if(_get(selectUserInfo, 'id') === _get(selectUserProfile, 'id')) {
    router.push({ pathname: PROFILE })
  }

  const setTab = (param) => {
    const tab = _get(param, 'tab.value', 'upload-file');
    setActiveTabValue(tab);
    router.push({ pathname: USER_PROFILE, query: { ...router.query, tab } })
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

  const components = {
    'portfolio': <Portfolio
      isLoading={selectIsUserProfileLoading}
      projects={completedProjects}
      showActions={false}
    />,
    'projects': <Projects
      isLoading={selectIsUserProfileLoading}
      showCreateButton={false}
      projects={currentProjects}
      selectUserInfo={selectUserInfo}
      showActions={false}
    />,
    'details': <Details selectStudentInfo={_get(selectUserProfile, 'student', {})} showEdit={false} />,
  }

  return (
    <PageContainer active={"profile"} showNav={false}>
      <div className={s.imageCover}>
        <div className={s.image}>
          <div className={s.imageArea}>
            <img src={_get(selectUserProfile, "avatar")} />
          </div>
        </div>
      </div>
      <div className={s.account}>
        <div className={s.name}>
          <div className={s.nameArea}>
            {_get(selectUserProfile, "name")}
          </div>
        </div>
        <div className={s.email}>
          {_get(selectUserProfile, "email")}
        </div>
        <br />
        <Tabs data={tabItems} activeTabValue={activeTabValue} callback={setTab} />
        {components[activeTabValue]}
      </div>
    </PageContainer>
  );
};

export default (Profile);

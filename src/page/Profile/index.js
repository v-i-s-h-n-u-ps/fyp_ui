import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';

import s from "./index.module.scss";
import { PROFILE } from "@constants/routes";
import PageContainer from "@hoc/PageContainer";
import Tabs from "@components/tabModule";
import Details from "./Details";
import Portfolio from "./Portfolio";
import Projects from "./Projects";
import Input from "@common/Input";
import { toast } from "react-toastify";

const S3Upload = dynamic(() => import('@components/thirdParty/s3'), { ssr: false });

const Profile = props => {

  const router = useRouter();

  const {
    selectUserInfo = {}, selectStudentInfo = {}, selectMyProjects = [], selectIsLoadingProjects,
    selectIsProjectSubmitting, d__createProject, d__updateProject, selectUniversity,
    selectThemePreference, selectCategory, d__updateUser, d__globalModalFlag, d__globalModalFlagUnset
  } = props;

  const [activeTabValue, setActiveTabValue] = useState(_get(router, 'query.tab', 'portfolio'));
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(_get(selectUserInfo, "name"));
  const [avatar, setAvatar] = useState(_get(selectUserInfo, "avatar"));

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

  const cancel = () => {
    setEdit(false);
    setName(_get(selectUserInfo, "name"));
    setAvatar(_get(selectUserInfo, "avatar"));
  }

  const save = () => {
    if (!name) {
      toast.warn("Name cannot be empty")
    }
    d__updateUser({ avatar, name })
    setEdit(false);
    setName(_get(selectUserInfo, "name"));
    setAvatar(_get(selectUserInfo, "avatar"));
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
      theme={_get(selectThemePreference, 'theme', 'light')}
      selectCategory={selectCategory}
      selectUserInfo={selectUserInfo}
      setGlobalModal={d__globalModalFlag}
      unsetGlobalModal={d__globalModalFlagUnset}
      location={_get(selectStudentInfo, 'universityDetails.id')}
    />,
    'details': <Details selectStudentInfo={selectStudentInfo} />,
  }

  useEffect(() => {
    setName(_get(selectUserInfo, "name"));
    setAvatar(_get(selectUserInfo, "avatar"));
  }, [edit, selectUserInfo])

  return (
    <PageContainer active={"profile"} showNav={false}>
      <div className={s.imageCover}>
        <div className={s.image}>
          <div className={s.imageArea}>
            <img src={avatar} />
            {(
              <S3Upload
                accept="image/*"
                onUpload={data => setAvatar(_get(data, 'location'))}
                directory={`user/${_get(selectUserInfo, 'id')}`}
                showChildren={true}
              >
                <div className={s.edit} onClick={() => setEdit(true)}>
                  <span>
                    <i className={`icon-pencil ${s.icon}`} />
                      Edit
                  </span>
                </div>
              </S3Upload>
            )}
          </div>
        </div>
      </div>
      <div className={s.account}>
        <div className={s.name}>
          {edit
            ? <div className={s.editName}>
              <div className={s.input}>
                <Input
                  handleChange={e => setName(e.target.value)}
                  value={name}
                  label={"Name"}
                />
              </div>
              <div>
                <i className={`icon-close ${s.icon} ${s.action}`} onClick={cancel} />
                <i className={`icon-check ${s.icon} ${s.action}`} onClick={save} />
              </div>
            </div>
            : <div className={s.nameArea}>
              {_get(selectUserInfo, "name")}
              <i className={`icon-pencil ${s.icon}`} onClick={() => setEdit(true)} />
            </div>
          }
        </div>
        {!edit && (
          <div className={s.email}>
            {_get(selectUserInfo, "email")}
          </div>
        )}
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

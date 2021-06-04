import React, { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import Link from "next/link";
import dynamic from "next/dynamic";

import s from "./index.module.scss";
import { noProjects } from "@constants/images";
import { PROFILE } from "@constants/routes";
import ActivityIndicator from "@components/loaders/ActivityIndicator";
import PageContainer from "@hoc/PageContainer";
import Map from "@components/thirdParty/maps";
import Project from "@cards/Project";
import Input from "@common/Input";

const MultiSelect = dynamic(() => import("@common/MultiSelect"), { ssr: false });

const SIZE = 20;

const Dashboard = props => {

  const {
    selectThemePreference: { theme }, d__getProjectHome,
    selectHomeData, selectHomePageInfo, selectIsHomeDataLoading,
    d__newChat, d__unsetProjectHome, selectCategory, selectUniversity
  } = props;

  const [page, setPage] = useState(1);
  const [locations, setLocations] = useState([]);
  const [hoverItem, setHoverItem] = useState('');
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [university, setUniversity] = useState([]);
  const [projects, setProjects] = useState([]);

  let scrollThrottle;

  const incrementPage = () => {
    if (scrollThrottle) clearTimeout(scrollThrottle);
    scrollThrottle = setTimeout(() => {
      !selectIsHomeDataLoading && fetchData();
    }, 100);
  }

  const fetchData = () => {
    const data = {
      page: page,
      size: SIZE,
    }
    d__getProjectHome(data);
    setPage(page + 1);
  }

  const filter = () => {
    const _projects = Object.assign(selectHomeData, []);
    if (!university.length && !categories.length && !search)
      setProjects(_projects);
    else {
      const filteredProjects = [];
      _projects.forEach(project => {
        let add = false;
        if (project.university.id === university) add = true;
        project.categories.forEach(category => {
          if (category.category === categories) add = true;
        })
        if (add) filteredProjects.push(project);
      })
      if (!!search) {
        const _projects = Object.assign(selectHomeData, []);
        const searchedProjects = _projects.filter(project => (
          project.name.indexOf(search) !== -1 || project.createdBy.indexOf(search) !== -1 ||
          project.description.indexOf(search) !== -1
        ))
        setProjects(searchedProjects)
      } else setProjects(filteredProjects);
    }
  }

  useEffect(() => {
    d__unsetProjectHome();
    fetchData();
  }, [])

  useEffect(() => {
    let locs = []
    selectHomeData.forEach(item => {
      if (locs.filter(location => location.id === item.university.id).length)
        return;
      else {
        locs.push(item.university)
      }
    })
    setProjects(selectHomeData);
    setLocations(locs);
    filter();
  }, [selectHomeData]);

  useEffect(() => {
    filter();
  }, [categories, university, search]);

  return (
    <PageContainer active={"dashboard"} name="Dashboard">
      <div className={s.container}>
        {(selectHomeData && !!selectHomeData.length) || selectIsHomeDataLoading
          ? (
            <div className={s.infiniteLoader}>
              <div className={s.filterAndSearch}>
                <div className={s.search}>
                  <Input
                    value={search}
                    handleChange={e => setSearch(e.target.value)}
                    placeholder={"Search"}
                    noBorder={true}
                    showEdit={true}
                    secondaryText={<i className={`icon-search ${s.searchIcon}`} />}
                  />
                </div>
                <div className={s.filter}>
                  <MultiSelect
                    options={selectCategory}
                    selectedValues={categories}
                    onSelect={(_, item) => setCategories(item.id)}
                    onRemove={(_, item) => setCategories([])}
                    display="name"
                    name="categories"
                    emptyMessage="No categories available."
                    placeholder={!categories.length ? 'Category' : ''}
                    key="id"
                    label="Category"
                    selectionLimit={1}
                    closeOnSelect={true}
                  />
                  <MultiSelect
                    options={selectUniversity}
                    selectedValues={university}
                    onSelect={(_, item) => setUniversity(item.id)}
                    onRemove={(_, item) => setUniversity([])}
                    display="name"
                    name="university"
                    emptyMessage="No universities available."
                    placeholder={!categories.length ? 'University' : ''}
                    key="id"
                    label="University"
                    selectionLimit={1}
                    closeOnSelect={true}
                  />
                </div>
              </div>
              <div className={s.projectsContainer}>
                {!!projects.length
                  ? projects.map(project => (
                    <div
                      onMouseOver={() => setHoverItem(project.university.id)}
                      onMouseLeave={() => setHoverItem('')}
                    >
                      <Project
                        project={project}
                        key={project.default ? undefined : project.id}
                        showMessage={true}
                        onClick={d__newChat}
                        navigate={false}
                      />
                    </div>
                  ))
                  : <div className={s.noProjects}>
                    There are no projects available. Refine your search.
                    </div>
                }
                {!!selectHomePageInfo.next && !university && !categories && !search &&
                  <Waypoint fireOnRapidScroll={false} onEnter={() => { incrementPage() }} />
                }
              </div>
              <div className={s.spinnerContainer}>
                <ActivityIndicator showCondition={selectIsHomeDataLoading} />
              </div>
            </div>
          ) : (
            <div className={s.noProjects}>
              <div className={s.noProjectsImage}>
                <img src={noProjects} />
              </div>
              There are no projects available. Be the first one to create.
              <Link href={{ pathname: PROFILE, query: { tab: 'projects' } }} >
                <p>Create Project</p>
              </Link>
            </div>
          )}
        <div className={s.maps}>
          <Map
            locations={locations}
            latKey="latitude"
            longKey="longitude"
            theme={theme}
            focusItem={hoverItem}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default (Dashboard);

import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import _find from "lodash/find";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';

import s from "./index.module.scss";
import { GROUPS } from "@constants/routes";
import PageContainer from "@hoc/PageContainer";
import NavigateTo from "@common/navigateTo";
import Participant from "@cards/Participant";
import TasksTable from "@components/tables/Tasks";
import TaskForm from "@forms/Task";
import Button from "@common/Button";

const MultiSelect = dynamic(() => import('@common/MultiSelect'), { ssr: false });
const TalkJS = dynamic(() => import('@components/thirdParty/talkjs'), { ssr: false });

const ProjectDetails = props => {

  dayjs.extend(advancedFormat);

  const {
    selectProjectDetails, id, d__getProjectParticipants,
    selectUserInfo = {}, selectThemePreference: { theme },
    d__getProjectTask, d__updateProjectTask, d__addProjectTask,
    selectProjectTasks, selectProjectTasksIsUpdating, selectType,
    selectSearchResults, d__searchUsers, selectIsSearching,
    d__manageProjectParticipants, d__setGlobalModalFlag,
    d__unsetGlobalModalFlag, d__updateProject
  } = props;

  const [search, setSearch] = useState('');
  const [user, setUser] = useState();
  const [searchResults, setSearchResults] = useState([]);

  const participants = _get(selectProjectDetails, 'participants', []);
  const leader = participants.filter(item => item.isLeader)[0];
  const userIsLeader = selectUserInfo.id === _get(leader, 'userId');
  const isComplete = _get(selectProjectDetails, 'isComplete', false);

  const onSelect = _user => {
    setUser(_user);
    setSearch('')
  }

  const remove = data => {
    const modalData = {
      primaryText: <>Remove <i>{data.name}</i></>,
      secondaryText: "Are you sure you want remove the member?",
      primaryActionText: "Confirm",
      secondaryActionText: "Cancel",
      primaryAction: () => d__manageProjectParticipants({
        project: id,
        user: data.id,
        action: 0
      }),
      secondaryAction: d__unsetGlobalModalFlag,
      closeOnBlur: false,
      showCloseButton: false,
    }
    d__setGlobalModalFlag('confirm', modalData)
  }

  const markCompleted = () => {
    const categories = selectProjectDetails.categories.map(category => category.category);
    const modalData = {
      primaryText: <>Complete Project</>,
      secondaryText: "Are you sure this project is completed?",
      primaryActionText: "Confirm",
      secondaryActionText: "Cancel",
      primaryAction: () => d__updateProject({
        ...selectProjectDetails,
        categories: categories,
        isComplete: true,
      }),
      secondaryAction: d__unsetGlobalModalFlag,
      closeOnBlur: false,
      showCloseButton: false,
    }
    d__setGlobalModalFlag('confirm', modalData)
  }

  const addTask = values => {
    d__addProjectTask({
      ...values,
      project: id
    })
  }

  const addParticipant = () => {
    d__manageProjectParticipants({
      project: id,
      user: user.id,
      action: 1
    })
    setUser(null);
  }

  useEffect(() => {
    d__getProjectParticipants({ id })
    d__getProjectTask({ id })
  }, [isComplete])

  useEffect(() => {
    if (search.length > 1 && !selectIsSearching)
      d__searchUsers({ search });
  }, [search])

  useEffect(() => {
    const participants = _get(selectProjectDetails, 'participants', []);
    const users = [];
    selectSearchResults.forEach(item => {
      const included = _find(participants, { userId: item.id })
      if (!included) users.push(item);
    })
    setSearchResults(users);
  }, [selectSearchResults]);

  return (
    <PageContainer name={_get(selectProjectDetails, 'name')}>
      <NavigateTo title={"Back"} link={GROUPS}>
        {userIsLeader && !isComplete
          ? <Button
            text="Complete Project"
            variant="hollow"
            onClick={markCompleted}
            width="250px"
          />
          : <p className={s.completed}>Completed</p>
        }
      </NavigateTo>
      <div className={s.container}>
        <div className={s.projectDetails}>
          <div className={s.descriptionContainer}>
            <div className={s.aboutMe}>
              <p className={s.heading}>about project</p>
              <p className={s.dates}>
                {dayjs(_get(selectProjectDetails, 'startDate')).format("Do MMM, YYYY")}
                {" "} - {dayjs(_get(selectProjectDetails, 'endDate')).format("Do MMM, YYYY")}
              </p>
            </div>
            <p className={s.description}>
              {_get(selectProjectDetails, 'description', "No Description")}
            </p>
            <div className={s.category}>
              {_get(selectProjectDetails, 'categories', []).map(category => (
                <span className={s.tag}>
                  {category.category_name}
                </span>
              ))}
            </div>
          </div>
          <div className={s.addParticipant}>
            <div className={s.search}>
              <MultiSelect
                options={searchResults}
                onSelect={(_, item) => onSelect(item)}
                display="email"
                onSearch={e => setSearch(e)}
                name="location"
                emptyMessage={!!search ? "No users available" : ''}
                key="id"
                multiple={true}
                selectionLimit={1}
                closeOnSelect={true}
                placeholder={"Search"}
              />
            </div>
            <Button
              text="Add Participant"
              onClick={addParticipant}
              disabled={!user || isComplete}
            />
          </div>
          <div className={s.participants}>
            <div>
              {_get(selectProjectDetails, 'participants', []).map(item => (
                <Participant
                  item={item}
                  isLeader={userIsLeader}
                  onRemove={remove}
                />
              ))}
            </div>
          </div>
          <div className={s.tasksContainer}>
            {!isComplete &&
              <TaskForm
                selectIsFormSubmitting={selectProjectTasksIsUpdating}
                selectType={selectType}
                theme={theme}
                submit={addTask}
              />
            }
            <TasksTable
              data={selectProjectTasks}
              isUpdating={selectProjectTasksIsUpdating}
              updateTask={d__updateProjectTask}
              selectType={selectType}
              theme={theme}
            />
          </div>
        </div>
        <div className={s.talkjs}>
          {!!_get(selectProjectDetails, "id") && (
            <TalkJS
              settings={{
                messageField: {
                  visible: !selectProjectDetails.isComplete
                }
              }}
              chatWith={_get(selectProjectDetails, 'participants', [])}
              project={{
                id: _get(selectProjectDetails, "id"),
                name: _get(selectProjectDetails, "name")
              }}
              theme={theme}
              mode="group"
            />
          )}
        </div>
      </div>
    </PageContainer>
  )
};

export default ProjectDetails;

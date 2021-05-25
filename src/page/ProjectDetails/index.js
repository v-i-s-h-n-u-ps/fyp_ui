import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import dynamic from "next/dynamic";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";
import TalkJS from "@components/thirdParty/talkjs";
import NavigateTo from "@common/NavigateTo";
import Participant from "@cards/Participant";
import TasksTable from "@components/tables/Tasks";
import TaskForm from "@forms/Task";
import Button from "@common/Button";

const MultiSelect = dynamic(() => import('@common/MultiSelect'), { ssr: false });

const ProjectDetails = props => {

    const {
        selectProjectDetails, id, d__getProjectParticipants,
        selectUserInfo = {}, selectThemePreference: { theme },
        d__getProjectTask, d__updateProjectTask, d__addProjectTask,
        selectProjectTasks, selectProjectTasksIsUpdating, selectType,
        selectSearchResults, d__searchUsers, selectIsSearching,
        d__manageProjectParticipants
    } = props;

    const [search, setSearch] = useState('');
    const [user, setUser] = useState();

    const participants = _get(selectProjectDetails, 'participants', []);
    const leader = participants.filter(item => item.isLeader)[0];
    const userIsLeader = selectUserInfo.id === _get(leader, 'userId');

    const onSelect = _user => {
        setUser(_user);
        setSearch('')
    }

    const remove = data => {

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
    }, [])

    useEffect(() => {
        if (search.length > 1 && !selectIsSearching)
            d__searchUsers({ search });
    }, [search])

    console.log("selectProjectDetails", selectProjectTasks)

    return (
        <PageContainer>
            <NavigateTo title={"Back"} />
            <div className={s.container}>
                <div className={s.projectDetails}>
                    <div className={s.descriptionContainer}>
                        <p className={s.heading}>about project</p>
                        <p className={s.description}>
                            {_get(selectProjectDetails, 'description', "No Description")}
                        </p>
                    </div>
                    <div className={s.addParticipant}>
                        <div className={s.search}>
                            <MultiSelect
                                options={selectSearchResults}
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
                            disabled={!user}
                        />
                    </div>
                    <div className={s.participants}>
                        {_get(selectProjectDetails, 'participants', []).map(item => (
                            <Participant item={item} isLeader={userIsLeader} onRemove={remove} />
                        ))}
                    </div>
                    <div className={s.tasksContainer}>
                        <TaskForm
                            selectIsFormSubmitting={selectProjectTasksIsUpdating}
                            selectType={selectType}
                            theme={theme}
                            submit={addTask}
                        />
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

import React, { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";

import s from "./index.module.scss";
import ActivityIndicator from "@components/loaders/ActivityIndicator";
import PageContainer from "@hoc/PageContainer";
import Map from "@components/thirdParty/maps";
import Project from "@cards/Project";

const SIZE = 20;

const Dashboard = props => {

    const {
        selectThemePreference: { theme }, d__getProjectHome,
        selectHomeData, selectHomePageInfo, selectIsHomeDataLoading,
        d__newChat
    } = props;

    const [page, setPage] = useState(1);
    const [locations, setLocations] = useState([]);
    const [hoverItem, setHoverItem] = useState('')

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

    useEffect(() => {
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
        setLocations(locs);
    }, [selectHomeData])

    return (
        <PageContainer active={"dashboard"}>
            <div className={s.container}>
                {(selectHomeData && !selectHomeData.length) || selectIsHomeDataLoading
                    ? (
                        <div className={s.infiniteLoader}>
                            <div className={s.projectsContainer}>
                                {selectHomeData.map(project => (
                                    <div
                                        onMouseOver={() => setHoverItem(project.university.id)}
                                        onMouseLeave={() => setHoverItem('')}
                                    >
                                        <Project
                                            project={project}
                                            key={project.default ? undefined : project.id}
                                            showMessage={true}
                                            onClick={d__newChat}
                                        />
                                    </div>
                                ))}
                                {!!selectHomePageInfo.next &&
                                    <Waypoint fireOnRapidScroll={false} onEnter={() => { incrementPage() }} />
                                }
                            </div>
                            <div className={s.spinnerContainer}>
                                <ActivityIndicator showCondition={selectIsHomeDataLoading} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            No Projects Available
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

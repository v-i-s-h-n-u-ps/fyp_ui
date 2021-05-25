import React from 'react';
import s from './tabComponent.module.scss';
import CarouselTitle from "../title/Title";
import FilterButtons from "../../screens/gallery/FilterButtons";
import ProjectCard from "../cards/ProjectCard";
const TabComponent = ({count = 0, filterButtons}) => (
    <>
      <div className={`${s.section}`}>
        <div className={`${s.tabHeader}`}>
          <CarouselTitle title={`All Projects`} icon={'star_filled'}/>
          <span>
            {`(${count})`}
          </span>
        </div>
        <div className={`${s.tabHeader}`}>
          <span>View By:</span>
          <div className={`${s.filterBtnContainer}`}>
            <FilterButtons data={filterButtons}/>
          </div>
        </div>

      </div>
    </>
);
export default TabComponent;
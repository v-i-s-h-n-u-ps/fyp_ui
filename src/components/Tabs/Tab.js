import React, { useCallback } from 'react';
import s from './Tab.module.scss';

const Tab = ({data, activeTab, handleClick, locale="en"}) => {
    const changeTabs = (data) => {
      if(activeTab !== data.value) handleClick(data)
    }
  return (
      <li
          className={activeTab === data.value ? `${s.tabListItem} ${s.tabListActive} gtm-gallery-tab-${data.value}`:`${s.tabListItem} gtm-gallery-tab-${data.value}`}
          onClick={()=>changeTabs(data)}
          key={data.value}
      >
        {activeTab === data.value ? <div className={`${s.activeBorder} gtm-gallery-tab-${data.value}`}></div> : null}
        <span className={`${s.tabLabel} gtm-gallery-tab-${data.value}`}>{data.label[locale]}</span>
      </li>
  );
};
export default Tab;
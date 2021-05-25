import React, { useCallback } from 'react';
import s from './Tab.module.scss';

const Tab = ({ data, activeTab, handleClick }) => {
  const changeTabs = (data) => {
    if (activeTab !== data.value) handleClick(data)
  }
  return (
    <li
      className={activeTab === data.value ? `${s.tabListItem} ${s.tabListActive} ` : `${s.tabListItem}`}
      onClick={() => changeTabs(data)}
      key={data.value}
    >
      {activeTab === data.value ? <div className={`${s.activeBorder} `}></div> : null}
      <div className={`${s.tabLabel} `}>{data.label}</div>
    </li>
  );
};

export default Tab;

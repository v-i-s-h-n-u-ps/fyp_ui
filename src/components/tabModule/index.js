import React from 'react';

import s from './Tab.module.scss';
import Tab from './Tab';

const Tabs = ({ data, activeTabValue, callback }) => {
  const changeTabs = (item) => {
    callback({ tab: item })
  }

  return (
    <div className={s.tabContainer}>
      <ol className={`${s.tabList}`}>
        {data.map((item) => {
          return (
            <Tab
              activeTab={activeTabValue}
              key={item.value}
              data={item}
              handleClick={(item) => { changeTabs(item) }}
            />
          );
        })
        }
      </ol>
    </div>
  );
};

export default Tabs;

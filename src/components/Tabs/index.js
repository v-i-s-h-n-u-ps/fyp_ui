import React from 'react';
import s from './Tab.module.scss';
import Tab from './Tab';
import {get as _get} from "lodash";

const Tabs = ({data,activeTabValue,callbackQuery,locale}) => {
  // const [activeTab, onClickTabItem] = useState(data[0]);
  const changeTabs = (item) => {
      callbackQuery({tab:item})
      // onClickTabItem(data.value);
  }

    // useEffect(()=>{
    //     onClickTabItem(activeTabValue);
    // },[activeTabValue]);

  return (
      <div className={s.tabContainer}>
        <ol className={`${s.tabList}`}>
          {data.map((item) => {
            return (
                <Tab
                    activeTab={activeTabValue}
                    key={item.value}
                    data={item}
                    handleClick={(item) => {changeTabs(item)}}
                    locale={locale}
                />
            );
          })
          }
        </ol>
      </div>
  );
};
export default Tabs;
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";

const MultiSelect = dynamic(() => import('@common/MultiSelect'), { ssr: false });
const TalkJS = dynamic(() => import('@components/thirdParty/talkjs'), { ssr: false });

const Chats = props => {

  const {
    selectSearchResults = [], d__searchUsers, selectIsSearching, selectUserInfo,
    selectNewChat = {}, selectThemePreference: { theme }
  } = props;

  const [search, setSearch] = useState('');
  const [user, setUser] = useState(selectNewChat);

  const onSelect = _user => {
    setUser(_user);
    setSearch('')
  }

  useEffect(() => {
    if (search.length > 1 && !selectIsSearching)
      d__searchUsers({ search });
  }, [search])

  useEffect(() => {
    setUser(selectNewChat);
  }, [selectNewChat])

  return (
    <PageContainer active={"send"} name="Chats">
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
          placeholder={"Search By Email"}
          noBorder={true}
        />
      </div>
      <div className={s.talkjs}>
        <TalkJS
          chatWith={user}
          selectUserInfo={selectUserInfo}
          theme={theme}
        />
      </div>
    </PageContainer>
  );
};

export default (Chats);

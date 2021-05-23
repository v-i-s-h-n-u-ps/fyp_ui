import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";
import Talkjs from "@components/thirdParty/talkjs";

const MultiSelect = dynamic(() => import('@common/MultiSelect'), { ssr: false });

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
        <PageContainer active={"home"}>
            <div style={{ marginLeft: "20px" }}>
                <MultiSelect
                    options={selectSearchResults}
                    onSelect={(_, item) => onSelect(item)}
                    display="name"
                    onSearch={e => setSearch(e)}
                    name="location"
                    emptyMessage="No users available"
                    key="id"
                    multiple={true}
                    selectionLimit={1}
                    closeOnSelect={true}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "85vh" }}>
                <Talkjs
                    chatWith={user}
                    selectUserInfo={selectUserInfo}
                    theme={theme}
                />
            </div>
        </PageContainer>
    );
};

export default (Chats);

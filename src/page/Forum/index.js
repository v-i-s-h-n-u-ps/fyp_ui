import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import s from "./index.module.scss";
import PageContainer from "@hoc/PageContainer";
import TalkJS from "@components/thirdParty/talkjs";

const MultiSelect = dynamic(() => import('@common/MultiSelect'), { ssr: false });

const Forum = props => {

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
        <PageContainer active={"forum"}>
            <div style={{ width: "calc(100% - 10px)", overflow: "hidden", direction: "rtl"}}>
                <div className={s.talkjs} style={{ width: "calc(98vw + 260px)"}}>
                    <TalkJS
                        settings={{
                            showFeedHeader: false,
                            showMobileBackButton: false,
                            showChatHeader: false,
                            // dir: 'rtl'
                        }}
                        chatWith={user}
                        selectUserInfo={selectUserInfo}
                        theme={theme}
                        themeType='forum-'
                    // mode="group"
                    />
                </div>
            </div>
        </PageContainer>
    );
};

export default (Forum);
